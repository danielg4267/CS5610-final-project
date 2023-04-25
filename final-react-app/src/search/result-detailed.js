import {useParams, useNavigate} from "react-router-dom";
import {getAuthorDetailsByID, getBookDetailsByID} from "../services/openlib-services";
import {createReview, findReviewsByBookID, findReviewsByUserID} from "../services/reviews-services";
import {useSelector} from "react-redux"
import React, {useEffect, useState} from "react";
import AuthorComponent from "./author-component";
import ReviewsComponent from "../reviews/reviews-component";
import SalesComponent from "../sales/sales-component";

const COVER_SOURCE = "https://covers.openlibrary.org/b/id"


const ResultDetailed = () => {
    const {key} = useParams();
    const {currentUser} = useSelector(state=> state.userData)
    const [review, setReview] = useState([])
    const [details, setDetails] = useState({});
    const [postDate, setPostDate] = useState(null);
    const [newReview, setNewReview] = useState(null);

    const navigate = useNavigate();

    const fetchDetails = async () => {
        const bookDetails = await getBookDetailsByID(key);
        setDetails(bookDetails);

    }

    const postReview = async () => {
        const newReview = await createReview({bid:key, text:review})
        window.location.reload(false);
    }

    useEffect(() => {
        fetchDetails();
    }, [key, newReview]);



    return(
        <>
            <h2><i>{details.title}</i></h2>
            <div className="row">
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                        <tr>
                            {details.covers ? details.covers.map(cover =>
                                <td>
                                    <img src={`${COVER_SOURCE}/${cover}-M.jpg`}/>
                                </td>) : <td><img src="https://openlibrary.org/images/icons/avatar_book.png"/></td>}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <h3>Authors:</h3>

                {details.authors &&
                    details.authors.map((author) => <AuthorComponent author={author}/>)
                }
            </div>
            <div className="mt-3 mb-3">
                <h3>Description</h3>
                {details.description ?
                    <>{details.description.constructor === Object ? details.description.value : details.description}</>
                    : "No description available."}
            </div>
            <div className="mb-5">
                <h3>Tags</h3>
                {details.subjects ? details.subjects.slice(0,5).map(subject => <button onClick={()=> navigate(`/search/${subject}`)} className="btn btn-outline-secondary m-2">{subject}</button>)
                : "no tags"}
            </div>
            <div className="border-top mb-5 pt-5">
                <SalesComponent id={key} isUserID={false}/>
            </div>

            <h3>Here's What Other Readers Are Saying</h3>
            <ReviewsComponent id={key} isUserID={false}/>

            <div className="mt-5">
                {currentUser && currentUser.role !== "guest" && currentUser.isBuyer &&
                    <div>
                        <h3>Join The Conversation</h3>
                        <textarea className="form-control" rows={4} placeholder="Enter text here..." onChange={(e) => setReview(e.target.value)}></textarea>
                        <button className="btn btn-outline-success m-2" onClick={() => postReview()}>Post Review</button>
                    </div>
                }
            </div>




        </>
    )
}

export default ResultDetailed;

//<button className="btn btn-secondary">{subject}</button>

/*
{
                    details.authors.map(author =>
                        <li>
                            {author["author"]["key"]}
                        </li>

                    )
                }
 */
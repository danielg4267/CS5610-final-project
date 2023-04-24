import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findUserByID} from "../services/users-services";
import {getBookDetailsByID} from "../services/openlib-services";

const COVER_SOURCE = "https://covers.openlibrary.org/b/id"
const ReviewItemComponent = ({review, isUserList}) => {

    const [user, setUser] = useState(null)
    const [book, setBook] = useState(null);

    const fetchUser = async () => {
        const response = await findUserByID(review.uid)
        setUser(response);
    }
    const fetchBook = async () => {
        const response = await getBookDetailsByID(review.bid);
        setBook(response);
    }

    useEffect( () => {
            fetchUser();
            fetchBook();
        }, [])

    return(
        <>
        {user &&
            <>


                <div className="list-group-item bg-light flex-column align-items-start">
                    <div className="row">
                        <div className="col-2">
                            {isUserList && book ?
                                <img className="m-2" src={`${COVER_SOURCE}/${book.covers[0]}-M.jpg`} width={64} height={96}/> :
                                <img className="rounded-circle m-2" src={`${user.profilePic}`} width={96} height={96}/>}

                        </div>
                        <div className="col-10">
                            <div className="d-flex w-100 justify-content-between">

                                <h5 className="mb-1">
                                    <Link to={`/profile/${user._id}`}
                                          className="text-decoration-none text-dark">{user.username}</Link>'s review of
                                    {book &&
                                        <b><i><Link to={`/details/works/${review.bid}`} className="text-decoration-none text-dark">{" " + book.title}</Link></i></b>}
                                </h5>
                                <small><i className="bi bi-three-dots"></i></small>
                            </div>
                            <p className="mb-1">{review.text}</p>
                            <small>
                                {
                                    new Date(review.reviewDate.slice(0, 10)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                                }
                            </small>
                        </div>

                    </div>
                </div>
            </>
        }
        </>


    )
}

export default ReviewItemComponent;
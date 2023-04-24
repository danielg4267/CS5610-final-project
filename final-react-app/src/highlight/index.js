import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getHighlightedReview} from "../services/follow-services";
import ReviewItemComponent from "../reviews/review-item-component";

const COVER_SOURCE = "https://covers.openlibrary.org/b/id"

const Highlight = () => {
    const {currentUser} = useSelector((state) => state.userData);
    const [highlight, setHighlight] = useState(null);


    const fetchHighlightedReview = async () => {
        const reviewData = await getHighlightedReview(currentUser);
        setHighlight(reviewData)

    }

    useEffect(() => {
        fetchHighlightedReview()
    }, [currentUser])

    return(
        <>


            {highlight &&
                <div className="list-group">
                    <div className="list-group-item">{currentUser ? <h4>People You Follow Are Reading</h4> : <h4>People Are Talking About</h4>}</div>
                    <div className="list-group-item">
                        <Link to={`/details/works/${highlight.review.bid}`} className="text-decoration-none text-dark">
                        <img className="rounded mx-auto d-block mb-2" src={`${COVER_SOURCE}/${highlight.book.cover}-M.jpg`}/>
                        <h4 className="text-center"><i>{highlight.book.title}</i></h4>
                        </Link>
                    </div>

                    <div className="list-group-item bg-white rounded-bottom flex-column align-items-start">
                        <div className="row">
                            <div className="col-3">
                                    <img className="rounded-circle m-2" src={`${highlight.user.profilePic}`} width={72} height={72}/>
                            </div>
                            <div className="col-9">
                                <div className="d-flex w-100 justify-content-between">

                                    <h5 className="mt-3">
                                        <b><i>
                                            <Link to={`/details/works/${highlight.review.bid}`} className="text-decoration-none text-dark">
                                                Check out what {highlight.user.username} and others are saying about it!
                                            </Link>
                                        </i></b>
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            }

        </>


    )
}

export default Highlight;
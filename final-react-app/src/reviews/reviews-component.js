import {findReviewsByBookID, findReviewsByUserID} from "../services/reviews-services";
import React, {useEffect, useState} from "react";
import ReviewItemComponent from "./review-item-component";

const ReviewsComponent = ({id, isUserID}) => {

    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        setReviews([]);
        if(isUserID){
            const response = await findReviewsByUserID(id);
            setReviews(response);
        }
        else{
            const response = await findReviewsByBookID(id);
            setReviews(response);
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [id])

    return(
        <>
            {reviews && reviews.length > 0 ?
                <div className="list-group">
                    {reviews.map(review => <ReviewItemComponent review={review} isUserList={isUserID}/>)}
                </div> :
                <h5>No reviews yet!</h5>
            }
        </>

    )
}

export default ReviewsComponent;
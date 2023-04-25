import axios from 'axios';
import {findUserByID} from "./users-services";
import {getBookDetailsByID} from "./openlib-services";
import {getFollowing} from "./follow-services";
const API_BASE = 'http://localhost:4000/api'
const REVIEWS_API = `${API_BASE}/reviews`;

const api = axios.create({withCredentials: true})

export const createReview = async (review) => {
    const response = await api.post(REVIEWS_API, review);
    return response.data;
}

export const updateReview = async (review) => {

    const response = await api.put(REVIEWS_API, review);
    return response.data;
}

export const deleteReview = async (review) => {
    const response = await api.delete(`${REVIEWS_API}/${review._id}`)
    return response.data;
}

export const findReviewsByUserID = async (uid) => {
    const response = await api.get(`${REVIEWS_API}/user/${uid}`);
    return response.data;
}

export const findReviewsByBookID = async (bid) => {
    const response = await api.get(`${REVIEWS_API}/book/${bid}`);
    return response.data;
}

export const findRecentReviewByUserID = async (uid) => {
    const response = await api.get(`${REVIEWS_API}/recent/user/${uid}`)
    return response.data
}

export const findRecentReview = async () => {
    const response = await api.get(`${REVIEWS_API}/recent`)
    return response.data
}

export const getHighlightedReview = async (following) => {
    let reviewInfo = null;
    if(following){
        reviewInfo = await getRecentFollowedReview(following._id)
    }
    else{
        const review = await findRecentReview();
        const user = await findUserByID(review[0].uid);
        //For consistency's sake
        reviewInfo = {review: review[0], user:{_id: user._id, username: user.username, profilePic: user.profilePic}}
    }


    const bookInfo = await getBookDetailsByID(reviewInfo.review.bid);

    return({
        review: reviewInfo.review,
        user: reviewInfo.user,
        book: {title: bookInfo.title, cover: bookInfo.covers[0]}
    })

}
export const getRecentFollowedReview = async (following) => {

    const result = await getFollowing(following);
    const review = {};
    if(result.length > 0){
        const randomFollowed = result[Math.floor(Math.random() * result.length)];
        const review = await findRecentReviewByUserID(randomFollowed.followed._id);
        review.review = review[0];
        review.user = randomFollowed.followed;

    }
    if(result.length < 1 || !review.review){
        const response = await api.get(`${REVIEWS_API}/recent/ne-user/${following}`)
        const reviewData = response.data[0];
        const userData = await findUserByID(reviewData.uid);
        review.review = reviewData;
        //same structure as followed object, obv not rly necessary since it has all this info, but for consistency's sake
        review.user = {_id: userData._id, username: userData.username, profilePic: userData.profilePic}
    }

    if(review.review && review.user){return review;}
    else{return null;}

}
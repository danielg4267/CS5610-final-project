import axios from 'axios';
import {findRecentReview, findRecentReviewByUserID} from "./reviews-services";
import {findUserByID} from "./users-services";
import {getBookDetailsByID} from "./openlib-services";
const API_BASE = 'http://localhost:4000/api'
const FOLLOW_API = `${API_BASE}/follow`;

const api = axios.create({withCredentials: true})

export const followUser = async (uid) => {
    const result = await api.post(`${FOLLOW_API}/${uid}`);
    return result.data;
}

export const getFollowers = async (uid) => {
    const result = await api.get(`${FOLLOW_API}/${uid}`);
    console.log(`${FOLLOW_API}/${uid}`)
    //console.log(result.data);
    return result.data;
}

export const getFollowing = async (uid) => {
    const result = await api.get(`${FOLLOW_API}/following/${uid}`);
    //console.log(`${FOLLOW_API}/following/${uid}`)
    return result.data;
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
    if(result.length > 0){
        const randomFollowed = result[Math.floor(Math.random() * result.length)];
        const review = await findRecentReviewByUserID(randomFollowed.followed._id);
        return {review: review[0], user: randomFollowed.followed};
    }
    return null;

}

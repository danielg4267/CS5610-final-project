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

export const unfollowUser = async (uid) => {
    const result = await api.delete(`${FOLLOW_API}/${uid}`);
    return result.data;
}

export const getFollowers = async (uid) => {
    const result = await api.get(`${FOLLOW_API}/${uid}`);
    return result.data;
}

export const getFollowing = async (uid) => {
    const result = await api.get(`${FOLLOW_API}/following/${uid}`);
    //console.log(`${FOLLOW_API}/following/${uid}`)
    return result.data;
}

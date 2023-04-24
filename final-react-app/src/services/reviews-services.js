import axios from 'axios';
const API_BASE = 'http://localhost:4000/api'
const REVIEWS_API = `${API_BASE}/reviews`;

const api = axios.create({withCredentials: true})

export const createReview = async (review) => {
    const response = await api.post(REVIEWS_API, review);
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
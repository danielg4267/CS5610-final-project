import axios from 'axios';
const API_BASE = 'http://localhost:4000/api'
const OPENLIB_API = `${API_BASE}/openlib/search`;

const api = axios.create({withCredentials: true})
export const searchByTitle = async (title) => {
    const response = await api.get(`${OPENLIB_API}/title/${title}`)
    const results = response.data;
    return results;
}

export const getBookDetailsByID = async (bid) => {
    const response = await api.get(`${OPENLIB_API}/details/${bid}`)
    const results = response.data;
    return results;
}

export const getAuthorDetailsByID = async (aid) => {
    const response = await api.get(`${OPENLIB_API}/details/author/${aid}`)
    const results = response.data;
    return results;
}

export const getRecommended = async () => {
    const response = await api.get(`${OPENLIB_API}/recommended`);
    const results = response.data;
    return results;
}

export const getTrending = async () => {
    const response = await api.get(`${OPENLIB_API}/trending`);
    const results = response.data;
    return results;
}
import axios from 'axios';
const API_BASE = 'http://localhost:4000/api'
const USERS_API = `${API_BASE}/users`;

const api = axios.create({withCredentials: true})


export const login = async ({ username, password }) => {
    //console.log(username, password);
    const response = await api.post(`${USERS_API}/login`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};

export const register = async (user) => {
    const response = await api.post(`${USERS_API}/register`,
        user)
    const newUser = response.data;
    return newUser;
}

export const logout = async() => {

    const response = await api.post(`${USERS_API}/logout`)
}

export const profile = async () => {
    //console.log(uid);
    const response = await api.post(`${USERS_API}/profile`);
    const profile = response.data;
    return profile;
}

export const findUserByID = async (uid) => {

    const response = await api.get(`${USERS_API}/profile/${uid}`);
    const profile = response.data;
    return profile;
}

export const updateUser = async (updateInfo) => {
    const response = await api.put(`${USERS_API}/update`, updateInfo);
    return response.data;
}

export const updateUserPrivileges = async (updateInfo, uid) => {
    const response = await api.put(`${USERS_API}/update/${uid}`, updateInfo);
    console.log(`${USERS_API}/update/${uid}`)
    return response.data;
}

export const findUserByUsername = async (username) => {
    const response = await api.get(`${USERS_API}/profile//username/${username}`);
    const profile = response.data;
    return profile;
}


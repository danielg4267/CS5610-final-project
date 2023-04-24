import {profileThunk} from "../services/users-thunks.js";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
const LoadProfile = ({ children }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileThunk())
    }, [])
    return(children)
}

export default LoadProfile;
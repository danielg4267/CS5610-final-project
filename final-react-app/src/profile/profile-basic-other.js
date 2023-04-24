
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProfileSideComponent from "./profile-side-component";
import {findUserByID} from "../services/users-services.js";

const Profile = () => {
    const {uid} = useParams();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const response = await findUserByID(uid);
        setUser(response);
    }
    useEffect(() => {
        fetchUser();
    }, [uid]);


    return(
        <>
            {user &&
                <ProfileSideComponent user={user}/>
            }
        </>

    )
}

export default Profile;
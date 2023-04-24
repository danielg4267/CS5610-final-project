import {Link} from "react-router-dom";
import ProfileSideComponent from "./profile-side-component";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

const Profile = () => {
    const {currentUser} = useSelector(state => state.userData)
    const [user, setUser] = useState(currentUser)


    useEffect(() => {
        setUser(currentUser);
    }, [currentUser])



    return(
        <Link to="/profile" className="text-decoration-none text-dark">
            <ProfileSideComponent user={user}/>
        </Link>
    )
}

export default Profile;
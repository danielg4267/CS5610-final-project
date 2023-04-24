import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams, Link, useNavigate} from "react-router-dom";
import ProfileSideComponent from "./profile-side-component";
import {followUser, getFollowers, getFollowing, getRecentFollowedReview} from "../services/follow-services";
import {findUserByID} from "../services/users-services.js";
import ReviewsComponent from "../reviews/reviews-component";
import FollowersComponent from "./followers-component";

const ProfileDetailedOther = () => {
    const {currentUser} = useSelector((state) => state.userData);
    const {uid} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState(false);

    if(currentUser && uid === currentUser._id){
        navigate(`/profile`)
    }

    const follow = async () => {
        const response = await followUser(user._id);
        window.location.reload(false);
        //console.log(response);
    }

    const fetchFollowers = async (uid) => {
        const followers = await getFollowers(uid);
        setFollowers(followers);

    }
    const fetchUser = async () => {
        const response = await findUserByID(uid);
        setUser(response);
    }
    useEffect(() => {
        fetchFollowers(uid);
        fetchUser();
    }, [uid]);

    return(
        <>
            {user &&
                <>
                    <h2>About {user.username}</h2>

                    <p>{user.extendedBio}</p>
                    <h2 className="mt-5 mb-3">{user.username}'s Reviews</h2>

                    <ReviewsComponent id={user._id} isUserID={true}/>
                    <div className="row mt-5">
                        <div className="col-6">
                            <FollowersComponent followers={followers}/>
                        </div>
                        <div className="col-6">
                            {currentUser && currentUser._id !== uid && !followers.find((follow) => follow.follower._id === currentUser._id) &&
                                <>
                                    <h2>Become A Follower</h2>
                                    <button className="btn btn-outline-primary" onClick={() => follow()}>Follow</button>
                                </>
                            }
                        </div>
                    </div>


                </>
            }

        </>
    )

}

export default ProfileDetailedOther;

/*
<div className="list-group-item">
                                    <img width={48} height={48} className="rounded-circle" src={follower.profilePic}/>
                                </div>
 */
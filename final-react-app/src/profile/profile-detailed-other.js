import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {
    followUser,
    getFollowers,
    unfollowUser
} from "../services/follow-services";
import {findUserByID} from "../services/users-services.js";
import ReviewsComponent from "../reviews/reviews-component";
import FollowersComponent from "./followers-component";
import SalesComponent from "../sales/sales-component";
import AdminComponent from "./admin-component";

const ProfileDetailedOther = () => {
    const {currentUser} = useSelector((state) => state.userData);
    const {uid} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);

    if(currentUser && uid === currentUser._id){
        navigate(`/profile`)
    }

    const follow = async () => {
        const response = await followUser(user._id);
        window.location.reload(false);

    }

    const unFollow = async () => {
        const response = await unfollowUser(user._id);
        window.location.reload(false);

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
                    {currentUser && currentUser.isAdmin &&
                        <AdminComponent user={user}/>
                    }
                    <>{!user.isBuyer && <h2 className="mt-4">Buy from {user.username}</h2>}</>
                    {user.isBuyer ?
                        <>
                            <h2 className="mt-5 mb-3">{user.username}'s Reviews</h2>
                            <ReviewsComponent id={user._id} isUserID={true}/>
                        </> :
                        <>
                            <div className="mb-5">
                                <SalesComponent id={user._id} isUserID={true}/>
                            </div>
                        </>}
                    <div className="row mt-5">
                        <>
                            {followers && followers.length > 0 &&
                                <div className="col-6">
                                    <FollowersComponent followers={followers} isFollowingList={false}/>
                                </div>
                            }
                        </>
                        <div className="col-6">
                            {currentUser &&
                                <>
                                {currentUser._id !== uid && !followers.find((follow) => follow.follower._id === currentUser._id) ?
                                    <>
                                        <h2>Become A Follower</h2>
                                        <button className="btn btn-outline-primary" onClick={() => follow()}>Follow</button>
                                    </> :
                                    <>
                                        <h2>Tired of Following?</h2>
                                        <button className="btn btn-outline-danger" onClick={() => unFollow()}>Unfollow</button>
                                    </>

                                }
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
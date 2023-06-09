import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ReviewsComponent from "../reviews/reviews-component";
import FollowersComponent from "./followers-component";
import {getFollowers, getFollowing} from "../services/follow-services";
import SalesComponent from "../sales/sales-component";

const ProfileDetailedSelf = () => {
    const {currentUser} = useSelector((state) => state.userData);
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState(false);


    const fetchFollowers = async () => {
        const followers = await getFollowers(currentUser._id);
        setFollowers(followers);
    }

    const fetchFollowing = async () => {
        const following = await getFollowing(currentUser._id);
        setFollowing(following);
    }

    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
    }, [currentUser]);

    if(currentUser){
        return(
            <>
                {currentUser &&
                    <>
                        <div className="row">
                            <div className="col">
                                <h2>About {currentUser.username}</h2>
                            </div>
                            <div className="col">
                                <div className="float-end me-5">
                                    <button className="btn btn-outline-primary my-2 my-sm-0" onClick={() => navigate(`/profile/edit`)}>Edit Profile</button>
                                </div>

                            </div>
                        </div>
                        <p>{currentUser.extendedBio}</p>
                        <h2>Personal Info</h2>
                        <h5>Birthday</h5>
                        <div>{new Date(currentUser.birthday.slice(0, 10)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}</div>
                        <h5>Email</h5>
                        <div>{currentUser.email}</div>
                        <h5>Phone</h5>
                        <div className="mb-5">{currentUser.phone}</div>

                        {currentUser.isBuyer ?
                            <>
                                <h2 className="mt-5 mb-3">{currentUser.username}'s Reviews</h2>
                                <ReviewsComponent id={currentUser._id} isUserID={true}/>
                            </> :
                            <>
                                <h2>Currently Selling:</h2>
                                <div className="mb-5">
                                    <SalesComponent id={currentUser._id} isUserID={true}/>
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
                            {following && following.length > 0 &&
                                <div className="col-6">
                                    <FollowersComponent followers={following} isFollowingList={true}/>
                                </div>
                            }
                        </div>


                    </>
                }

            </>

        )

    }
    else{
        return(
            <>
                <h2>You're not logged in!</h2>
                <Link to="/login" className="text-decoration-none">Click here to login.</Link>
            </>

        )
    }
}

export default ProfileDetailedSelf;
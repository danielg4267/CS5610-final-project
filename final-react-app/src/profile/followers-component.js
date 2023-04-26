import {Link} from "react-router-dom";
const FollowersComponent = ({followers, isFollowingList}) => {
    return(
        <>
            {followers &&
                <>

            <h2>{isFollowingList ? "Following" : "Followers"}</h2>
            <div className="list-group col-8">
                {followers.map((follow) =>
                    <div className="list-group-item">
                        <Link className="text-decoration-none text-dark" to={isFollowingList ? `/profile/${follow.followed._id}` : `/profile/${follow.follower._id}`}>
                            <div className="list-group-item border-0">
                                <img width={48} height={48} className="rounded-circle mx-auto d-block" src={isFollowingList ? follow.followed.profilePic : follow.follower.profilePic}/>
                            </div>
                        </Link>
                    </div>
                    )
                }

            </div>
            </>}
        </>
    )
}

export default FollowersComponent;
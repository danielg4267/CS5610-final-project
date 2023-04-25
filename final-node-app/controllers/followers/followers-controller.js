import * as followersDao from "./followers-dao.js";

const followUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser){
        res.sendStatus(403);
        return;
    }
    const followed = req.params.followed;
    const follow = {follower: currentUser._id, followed: followed}
    const result = await followersDao.followUser(follow);
    if(!result){
        res.sendStatus(403);
        return;
    }
    res.json(result);

}

const unfollowUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser){
        res.sendStatus(403);
        return;
    }
    const followed = req.params.followed;
    const status = await followersDao.unFollowUser(currentUser._id, followed);
    res.send(status);

}

const getFollowers = async (req, res) => {
    const followed = req.params.followed;
    try{
        const followers = await followersDao.getFollowers(followed);
        res.json(followers);
    }
    catch(e){
        res.sendStatus(404);
    }
}

const getFollowing = async (req, res) => {
    const follower = req.params.follower;
    const following = await followersDao.getFollowing(follower);
    res.json(following);
}

export default (app) => {
    app.post("/api/follow/:followed", followUser)
    app.delete("/api/follow/:followed", unfollowUser)
    app.get("/api/follow/:followed", getFollowers)
    app.get("/api/follow/following/:follower", getFollowing)
}
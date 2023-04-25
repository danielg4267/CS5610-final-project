import followersModel from "./followers-model.js";

export const followUser = async (follow) => {
    const found = await followersModel.find(follow);
    if(found.length < 1){
        return await followersModel.create(follow);
    }
}

export const unFollowUser = async (follower, followed) => {
    return await followersModel.deleteOne({follower:follower, followed: followed})
}

export const getFollowers = async (followed) => {
    return await followersModel
        .find({followed: followed})
        .populate("follower", "username profilePic")
        .exec();
}

export const getFollowing = async (follower) => {
    return await followersModel
        .find({follower: follower})
        .populate("followed", "username profilePic")
        .exec();
}
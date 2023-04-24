import mongoose from "mongoose";
const followersSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    followed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
}, {collection: "followers"});

export default followersSchema;
import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    uid: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    bid: {type: String, required: true},
    text: {type: String, required: true},
    reviewDate: {type: Date, required: true, default: Date.now}
    },
    {collection: "reviews"});

export default reviewsSchema;
import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
        uid: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
        bid: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    },
    {collection: "sales"});

export default salesSchema;
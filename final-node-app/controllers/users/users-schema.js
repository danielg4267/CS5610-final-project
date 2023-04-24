import mongoose from 'mongoose';
const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    birthday: {type: Date, default: Date.now},
    profilePic: {type: String, default: "/images/noProfPic.png"},
    coverPic: {type: String, default: "/images/noCoverPic.jpg"},
    bio: {type: String, default: ""},
    extendedBio: {type: String, default: ""},
    joinDate: {type: Date, default: Date.now},
    isAdmin: {type: Boolean, default: false},
    role: {type: String, default: "user", enum: ["user", "admin", "guest"]},
}, {collection: 'users'});
export default usersSchema;
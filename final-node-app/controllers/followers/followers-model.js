import mongoose from 'mongoose';
import followersSchema from './followers-schema.js'
const followersModel = mongoose
    .model('FollowersModel', followersSchema);
export default followersModel;
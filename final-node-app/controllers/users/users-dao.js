import usersModel from './users-model.js';
export const findAllUsers = async () => {return await usersModel.find();}


export const findUserByUsername = async (username) => {return await usersModel.findOne({username:username})}


export const findUserByUid = async (uid) => {
    return await usersModel.findById(uid);}


export const findUserByCredentials = async (username, password) => {
    return await usersModel.findOne({ username, password });}


export const createUser = async (user) => {return await usersModel.create(user);}


export const updateUser = async (uid, updatedInfo) => {
    return await usersModel.findOneAndUpdate({_id: uid},
                                        {$set: updatedInfo},
                                        {new : true});}


//export const deleteUser = (uid) => usersModel.deleteOne({ _id: uid });
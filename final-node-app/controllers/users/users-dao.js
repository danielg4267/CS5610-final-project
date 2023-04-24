import usersModel from './users-model.js';
export const findAllUsers = () => {usersModel.find();}


export const findUserByUsername = (username) => usersModel.findOne({username:username})


export const findUserByUid = (uid) =>
    usersModel.findById(uid);


export const findUserByCredentials = (username, password) =>
    usersModel.findOne({ username, password });


export const createUser = (user) => usersModel.create(user);


export const updateUser = (uid, user) =>
    usersModel.updateOne({ _id: uid }, user);


//export const deleteUser = (uid) => usersModel.deleteOne({ _id: uid });
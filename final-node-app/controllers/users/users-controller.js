import * as usersDao from './users-dao.js'

const register = async (req, res) => {
    const username = req.body.username;

    //The only validation I'm doing on the server bc I'm lazy
    //The client validates before sending, it's ok!
    //So long as no one sends me a post request manually it should be fine..... ;P
    const user = await usersDao
        .findUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return;
    }
    try{
        //console.log(req.body)
        const newUser = await usersDao
            .createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    }
    catch(e){
        res.sendStatus(409)
    }

};

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao
        .findUserByCredentials(username, password);
    if (user) {
        req.session["currentUser"] = user;
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser){
        res.sendStatus(404);
        return;
    }
    res.json(currentUser);
}

const findUserByID = async (req, res) => {
    const uid = req.params.uid;
    let user = null;
    //validator.isMongoId()
    try{
        user = await usersDao.findUserByUid(uid)
        user = {_id: user._id,
            username: user.username,
            joinDate: user.joinDate,
            profilePic: user.profilePic,
            coverPic: user.coverPic,
            role: user.role,
            bio: user.bio,
            extendedBio: user.extendedBio,
            isBuyer: user.isBuyer,
            isAdmin: user.isAdmin
        }
    }
    catch (e){
        res.sendStatus(404);
        return;

    }
    res.json(user);
};

const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    let user = null;
    try{
        user = await usersDao.findUserByUsername(username)
        user = {_id: user._id,
            username: user.username,
            joinDate: user.joinDate,
            profilePic: user.profilePic,
            coverPic: user.coverPic,
            role: user.role,
            bio: user.bio,
            extendedBio: user.extendedBio,
            isBuyer: user.isBuyer,
            isAdmin: user.isAdmin
        }
    }
    catch (e){
        res.sendStatus(404);
        return;

    }
    res.json(user);
};

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

const updateUser = async(req, res) => {
    const currentUser = req.session["currentUser"];

    if(!currentUser){
        res.sendStatus(403);
        return;
    }
    const updatedInfo = req.body;
    try{
        const updatedUser = await usersDao.updateUser(currentUser._id, updatedInfo)
        req.session["currentUser"] = updatedUser;
        res.json(updatedUser);
    }
    catch(e){
        res.sendStatus(404);
    }
}

const updateUserRole = async (req, res) => {
    //isAdmin, role, isBuyer
    //check if role == admin to update isAdmin
    const currentUser = req.session["currentUser"]
    const uid = req.params.uid;
    const toUpdate = req.body;

    //updating privileges requires admin status
    if(!currentUser || (currentUser._id !== uid && !currentUser.isAdmin)){
        res.sendStatus(403);
        return;
    }
    try{
        const newUser = await usersDao.updateUser(uid, toUpdate);
        const user = {_id: newUser._id,
            username: newUser.username,
            joinDate: newUser.joinDate,
            profilePic: newUser.profilePic,
            coverPic: newUser.coverPic,
            role: newUser.role,
            bio: newUser.bio,
            extendedBio: newUser.extendedBio,
            isBuyer: newUser.isBuyer,
            isAdmin: newUser.isAdmin
        }
        res.json(user);
    }
    catch(e){
        res.sendStatus(404);
    }







}

export default (app) => {
    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.get("/api/users/profile/:uid",  findUserByID);
    app.get("/api/users/profile/username/:username",  findUserByUsername);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users/update",          updateUser);
    app.put ("/api/users/update/:uid",          updateUserRole);

}

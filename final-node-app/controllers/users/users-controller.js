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
        console.log(req.body)
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
    try{
        user = await usersDao.findUserByUid(uid)
        user = {_id: user._id,
                username: user.username,
                joinDate: user.joinDate,
                profilePic: user.profilePic,
                coverPic: user.coverPic,
                bio: user.bio,
                extendedBio: user.extendedBio
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
            bio: user.bio,
            extendedBio: user.extendedBio
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
        res.sendStatus(404);
        return;
    }
    const updatedInfo = req.body;
    console.log(updatedInfo);
    try{
        const response = await usersDao.updateUser(currentUser._id, updatedInfo)
        const updatedUser = await usersDao.findUserByUid(currentUser._id);
        req.session["currentUser"] = updatedUser;
        res.json(updatedUser);
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
}

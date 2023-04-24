import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import session from "express-session";

import UserController from "./controllers/users/users-controller.js";
import OpenlibraryController from "./controllers/openlibrary/openlibrary-controller.js";
import SessionController from "./controllers/session/session-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import FollowersController from "./controllers/followers/followers-controller.js";

//TO CHANGE LATER
const DB_CONNECTION_STRING = "mongodb+srv://cs5610-dg-final:cs5610-dg-final@final-project-db.7b118ex.mongodb.net/final-project-db?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING);

const app = express();
app.use(
    session(
        {secret: "inators",
                resave: false,
                saveUninitialized: false,}
    )
);
app.use(
    cors(
    {credentials: true,
        origin: "http://localhost:3000",}
    )
);

app.use(express.json());
UserController(app);
OpenlibraryController(app);
SessionController(app);
ReviewsController(app);
FollowersController(app);
app.listen(process.env.PORT || 4000);
import * as reviewsDao from "./reviews-dao.js";
import {getBookDetailsByID, searchBySubject} from "../openlibrary/openlibrary-service.js";


const findAllReviews = async (req, res) => {
    const reviews = await reviewsDao.findAllReviews();
    res.json(reviews);
}

const findReviewsByBookID = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByBookID(req.params.bid);
    res.json(reviews);
}

const findRecentReviewByUserID = async (req, res) => {
    const reviews = await reviewsDao.findRecentReviewByUserID(req.params.uid);
    res.json(reviews);
}

const findRecentReview = async (req, res) => {
    const review = await reviewsDao.findRecentReview();
    res.json(review);
}
const findRecentReviewByNEUserID = async (req, res) => {
    const reviews = await reviewsDao.findRecentReviewByNEUserID(req.params.uid);
    res.json(reviews);
}

const findReviewsByUserID = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByUserID(req.params.uid);
    res.json(reviews);
}
const createReview = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(403);
        return;
    }
    const newReview = await reviewsDao.createReview({...req.body, uid: currentUser._id});

    res.json(newReview);
}

const updateReview = async (req, res) => {

    //should probably also check if id of user matches
    //the review...
    const currentUser = req.session["currentUser"]
    if(!currentUser || currentUser.role === "guest"){
        res.sendStatus(403);
        return;
    }
    //this can be added to the above, clean up later
    if(currentUser._id !== req.body.uid && !currentUser.isAdmin){
        res.sendStatus(403);
        return;
    }
    try{
        const updatedReview = await reviewsDao.updateReview(req.body);
        res.json(updatedReview);
    }
    catch(e){
        res.sendStatus(404);
    }
}

const deleteReview = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser || currentUser.role === "guest"){
        res.sendStatus(403);
        return;
    }

    const reviewID = req.params.rid;
    try{
        const review = await reviewsDao.findReviewsByReviewID(reviewID);
        if(!review.uid.equals(currentUser._id) && !currentUser.isAdmin){
            res.sendStatus(403);
            return;
        }
        const status = await reviewsDao.deleteReview(reviewID);
        res.send(status);
    }
    catch(e){
        res.sendStatus(404);
    }

}

export default (app) => {
    app.get('/api/reviews', findAllReviews);
    app.get('/api/reviews/book/:bid', findReviewsByBookID);
    app.get('/api/reviews/user/:uid', findReviewsByUserID);
    app.get('/api/reviews/recent/user/:uid', findRecentReviewByUserID);
    app.get('/api/reviews/recent/ne-user/:uid', findRecentReviewByNEUserID);
    app.get('/api/reviews/recent', findRecentReview);
    app.post('/api/reviews', createReview);
    app.put("/api/reviews", updateReview);
    app.delete("/api/reviews/:rid", deleteReview);
}
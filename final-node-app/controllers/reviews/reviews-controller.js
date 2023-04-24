import * as reviewsDao from "./reviews-dao.js";
import * as Dao from "./../users/users-dao.js"
import {getBookDetailsByID, searchBySubject} from "../openlibrary/openlibrary-service.js";


const findAllReviews = async (req, res) => {
    const reviews = await reviewsDao.findAllReviews();
    res.json(reviews);
}

const findReviewsByBookID = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByBookID(req.params.bid);
    res.json(reviews);
}

const getRecommendedByUserId = async (req, res) => {
    const review = await reviewsDao.findRecentReviewByUserID(req.params.uid);
    const bid = review[0].bid;
    const bookDetails = await getBookDetailsByID(bid);
    const subj1 = bookDetails.subjects[0].toLowerCase();
    const books1 = await searchBySubject(subj1);
    const subj2 = bookDetails.subjects[1].toLowerCase();
    const books2 = await searchBySubject(subj2);
    const subj3 = bookDetails.subjects[2].toLowerCase();
    const books3 = await searchBySubject(subj3);

    const recObj1 = {};
    recObj1[subj1] = books1;

    const recObj2 = {};
    recObj1[subj2] = books2;

    const recObj3 = {};
    recObj1[subj3] = books3;

    res.json([recObj1, recObj2, recObj3])


}

const findRecentReviewByUserID = async (req, res) => {
    const reviews = await reviewsDao.findRecentReviewByUserID(req.params.uid);
    res.json(reviews);
}

const findRecentReview = async (req, res) => {
    const review = await reviewsDao.findRecentReview();
    res.json(review);
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
    const reviewID = req.params.rid;
    const status = await reviewsDao.updateReview(reviewID, req.body);
    res.send(status);
}

const deleteReview = async (req, res) => {
    const reviewID = req.params.rid;
    const status = await reviewsDao.deleteReview(reviewID);
    res.send(status);
}

export default (app) => {
    app.get('/api/reviews', findAllReviews);
    app.get('/api/reviews/book/:bid', findReviewsByBookID);
    app.get('/api/reviews/user/:uid', findReviewsByUserID);
    app.get('/api/reviews/recent/user/:uid', findRecentReviewByUserID);
    app.get('/api/reviews/recent', findRecentReview);
    app.post('/api/reviews', createReview);
    app.put("/api/reviews/:rid", updateReview);
    app.delete("/api/reviews/:rid", deleteReview);
}
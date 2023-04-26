import * as service from "./openlibrary-service.js";
import * as reviewsDao from "../reviews/reviews-dao.js";

const searchByTitle = async (req, res) => {
    const title = req.params.title;
    const titles = await service.searchByTitle(title)
    res.json(titles);
}

const searchByAuthor = async (req, res) => {
    const author = req.params.author;
    const titles = await service.searchByAuthor(author)
    res.json(titles);
}

const searchByTitleAndAuthor = async (req, res) => {
    const title = req.params.title;
    const author = req.params.author;
    const titles = await service.searchByTitleAndAuthor(title, author);
    res.json(titles);
}

const getBookDetailsByID = async (req, res) => {
    const bid = req.params.bid;
    const details = await service.getBookDetailsByID(bid);
    res.json(details);
}

const getAuthorDetailsByID = async (req, res) => {
    const aid = req.params.aid;
    const details = await service.getAuthorDetailsByID(aid);
    res.json(details);
}

const searchRecommended = async (req, res) => {

    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(403);
        return;
    }

    const review = await reviewsDao.findRecentReviewByUserID(currentUser._id);
    if(!review.length > 0){
        res.json([])
        return;
    }
    const bid = review[0].bid;
    const bookDetails = await service.getBookDetailsByID(bid);

    let recommended = [];
    let i = 0;
    while(i < bookDetails.subjects.length && i < 3){
        const subject = bookDetails.subjects[i].toLowerCase();
        const books = await service.searchBySubject(subject);
        const recObj = {subject: subject, books: books}
        recommended = [...recommended, recObj];
        i++;
    }
    res.json(recommended)


}

const searchTrending = async (req, res) => {

    var review = [];
    review = await reviewsDao.findRecentReview();

    if(!review.length > 0){
        res.json([])
        return;
    }
    const bid = review[0].bid;
    const bookDetails = await service.getBookDetailsByID(bid);

    let recommended = [];
    let i = 0;
    while(i < bookDetails.subjects.length && i < 3){
        const subject = bookDetails.subjects[i].toLowerCase();
        const books = await service.searchBySubject(subject);
        const recObj = {subject: subject, books: books}
        recommended = [...recommended, recObj];
        i++;
    }
    res.json(recommended)


}



export default (app) => {
    app.get('/api/openlib/search/title/:title', searchByTitle);
    app.get('/api/openlib/search/recommended', searchRecommended);
    app.get('/api/openlib/search/trending', searchTrending);
    app.get('/api/openlib/search/author/:author', searchByAuthor);
    app.get('/api/openlib/search/title&author/:title/:author', searchByTitleAndAuthor);
    app.get('/api/openlib/search/details/:bid', getBookDetailsByID);
    app.get('/api/openlib/search/details/author/:aid', getAuthorDetailsByID);
}
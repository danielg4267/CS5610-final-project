import reviewsModel from "./reviews-model.js"

export const findAllReviews = async () => {return await reviewsModel.find();}

export const findReviewsByBookID = async (bookID) => {
    return await reviewsModel.find({bid: bookID});
}

export const findRecentReviewByUserID = async (uid) => {
    return await reviewsModel.find({uid: uid}).sort({reviewDate: -1}).limit(1);
}

export const findRecentReview = async () => {
    return await reviewsModel.find().sort({reviewDate: -1}).limit(1);
}

export const findReviewsByUserID = async (uid) => {
    return await reviewsModel.find({uid: uid});
}

export const createReview = async (review) => {
    return await reviewsModel.create(review);
}

export const deleteReview = async (reviewID) => {
    return await reviewsModel.deleteOne({_id: reviewID});
}

export const updateReview = async (reviewID, review) => {
    return await reviewsModel.updateOne({_id: reviewID}, {$set: review});
}
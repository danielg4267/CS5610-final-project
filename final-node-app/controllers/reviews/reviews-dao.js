import reviewsModel from "./reviews-model.js"

export const findAllReviews = async () => {return await reviewsModel.find();}

export const findReviewsByBookID = async (bookID) => {
    return await reviewsModel.find({bid: bookID});
}

export const findRecentReviewByUserID = async (uid) => {
    return await reviewsModel.find({uid: uid}).sort({reviewDate: -1}).limit(1);
}

export const findRecentReview = async (uid) => {
    return await reviewsModel.find().sort({reviewDate: -1}).limit(1);
}

export const findRecentReviewByNEUserID = async (uid) => {
    //find most recent that this user did not write
    return await reviewsModel.find({uid:{$ne: uid}}).sort({reviewDate: -1}).limit(1);}

export const findReviewsByUserID = async (uid) => {
    return await reviewsModel.find({uid: uid});
}

export const findReviewsByReviewID = async (rid) => {
    return await reviewsModel.findById(rid);
}

export const createReview = async (review) => {
    return await reviewsModel.create(review);
}

export const deleteReview = async (reviewID) => {
    return await reviewsModel.deleteOne({_id: reviewID});
}

export const updateReview = async (review) => {
    return await reviewsModel.findOneAndUpdate({_id: review._id},
                                                {$set: {text: review.text, reviewDate: Date.now()}},
                                                {new : true});
}
const mongoose = require('mongoose');
const Listing = require("../models/listing");
const Review = require("../models/review");
const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../schema')
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isReviewAuthor } = require('../Middlewares/loginMiddleware');



// {6} POST Review  Route
module.exports.createReview = async (req, res) => {

    let listing = await Listing.findById(req.params.id);

    let newReview = await Review(req.body.review)
    newReview.author = req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);

    listing.save();
    newReview.save();
    req.flash("success", "New Review Created!")

    // res.send(" New  Review saved");
    res.redirect(`/listings/${listing._id}`);
    // res.redirect(`/listings/${req.params.id}`);

}

// {7} Delete Review Route
module.exports.deleteReview = async (req, res) => {

    const { id, reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(404).json({ errors: "Invalid ID Format" })
    }

    const ListResult = await Listing.findByIdAndUpdate(
        id,
        {
            $pull: { reviews: reviewId }
        },
    );

    const ReviewResult = await Listing.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!")

    res.redirect(`/listings/${id}`)


}
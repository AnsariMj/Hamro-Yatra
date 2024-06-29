const Listing = require("../models/listing");
const Review = require("../models/review");
const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path, '..', req.originalUrl)
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', "Please login....!");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not a owner of this listing.");
        return res.redirect(`/listing/${id}`)
    }
    next();
}




// Used to Validate the Routes by using Joi Schema Validtion
module.exports.validateListings = (req, res, next) => {
    const { error } = listingSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
}



// Used to Validate the Routes by using Joi Schema Validation
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
}


module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    let Reviews = await Review.findById(id);
    if (!Reviews.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not a Author of this Review.");
        return res.redirect(`/listing/${id}`)
    }
    next();
}
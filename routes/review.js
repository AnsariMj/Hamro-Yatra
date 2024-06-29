const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../Middlewares/loginMiddleware');
const ReviewCtrl = require("../controller/review")


// Used to Validate the Routes by using Joi Schema Validation
// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body)
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(404, errMsg);
//     } else {
//         next();
//     }
// }


// Reviews 
// {6} POST Review  Route
router.post("/", isLoggedIn, validateReview, wrapAsync(ReviewCtrl.createReview))
// router.post("/", isLoggedIn,  wrapAsync(ReviewCtrl.createReview))


// {7} Delete Review Route
router.delete('/:reviewId', isLoggedIn, wrapAsync(ReviewCtrl.deleteReview))


module.exports = router;

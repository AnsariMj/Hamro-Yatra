// const express = require('express');
// const router = express.Router();
// const wrapAsync = require('../utils/wrapAsync');
// const { listingSchema } = require('../schema')
// const ExpressError = require('../utils/ExpressError');
// const { isLoggedIn, isOwner, validateListings } = require("../Middlewares/loginMiddleware")

// const ListingController = require("../controller/listing")


// router
//     .route("/")
//     .get(wrapAsync(ListingController.index))
//     .post(isLoggedIn, validateListings, wrapAsync(ListingController.createNewListing));

// router
//     .route("/:id")
//     .get(wrapAsync(ListingController.showListing))
//     .get(isLoggedIn, isOwner, wrapAsync(ListingController.editListing))
//     .put(isLoggedIn, isOwner, wrapAsync(ListingController.updateListing))
// // {1} Index Route
// // router.get("/", wrapAsync(ListingController.index))

// // {2.0} New Route
// router.get("/new", isLoggedIn, ListingController.renderNewForm)

// // 2.1 Create a New listing Route
// // router.post("/", isLoggedIn, validateListings, wrapAsync(ListingController.createNewListing));

// // {3}  Show Route
// // router.get("/:id", wrapAsync(ListingController.showListing));

// //  {4.0} Edit a new Listing Route
// // router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.editListing))

// // {4.1} Update  Route
// // router.put("/:id", isLoggedIn, isOwner, wrapAsync(ListingController.updateListing))

// // {5} Delete Listing Route
// router.delete('/:id', isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing))


// module.exports = router;





const express = require('express');
const multer = require('multer')
const { storage } = require('../CloudConfig')
// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage })
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema } = require('../schema')
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isOwner, validateListings } = require("../Middlewares/loginMiddleware")

const ListingController = require("../controller/listing")

// Used to Validate the Routes by using Joi Schema Validtion
// const validateListings = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body)
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(404, errMsg);
//     } else {
//         next();
//     }
// }

// {1} Index Route
router.get("/", wrapAsync(ListingController.index))

// {2.0} New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm)

// 2.1 Create a New listing Route
router.post("/", isLoggedIn, upload.single('listing[image]'), wrapAsync(ListingController.createNewListing));
// router.post("/", upload.single('listing[image]'), (req, res) => {
//     res.send(req.file)
// });

// {3}  Show Route
router.get("/:id", wrapAsync(ListingController.showListing));

//  {4.0} Edit a new Listing Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.editListing))

// {4.1} Update  Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]', validateListings, wrapAsync(ListingController.updateListing)));

// {5} Delete Listing Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing))


module.exports = router;
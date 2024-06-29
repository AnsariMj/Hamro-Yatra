const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const passport = require('passport');
const { saveRedirectUrl } = require('../Middlewares/loginMiddleware');
const { isLoggedIn } = require('../Middlewares/loginMiddleware');
const Listing = require('../models/listing');
const Booking = require('../models/booking');
const Userctrl = require('../controller/user');
//SignUp routes
router.get("/signup", wrapAsync(Userctrl.singnUpIndex))

router.post("/signup", wrapAsync(Userctrl.createUser))


// Login routes
router.get("/login", wrapAsync(Userctrl.loginIndex))

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    wrapAsync(Userctrl.loginUser)
);

//Logout
router.get('/logout', Userctrl.logout)

// router.get("/profile", isLoggedIn, async (req, res) => {
//     res.render("users/profile.ejs", { user: req.user, listings: userListings });
// })
router.get('/profile', isLoggedIn, wrapAsync(Userctrl.userProfile));
module.exports = router;
const Listing = require("../models/listing")
const User = require("../models/user")


//SignUp routes
module.exports.singnUpIndex = async (req, res) => {
    res.render("users/signup.ejs")
}

//create a new user
module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            req.flash("error", "All fields are required")
            return res.redirect("/signup")
        }
        const eamilRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if (!eamilRegex.test(email)) {
            req.flash("error", "Email should not contain numbers and must be a valid format");
            return res.redirect("/signup");
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (!passwordRegex.test(password)) {
            req.flash("error", "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character");
            return res.redirect("/signup");
        }
        const newUser = new User({ username, email })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", "Welcome to Hamro Yatra!")
            res.redirect("/listings")
        })

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup")
    }
}


//Login routes
module.exports.loginIndex = async (req, res) => {
    res.render("users/login.ejs")
}

//users Login  
module.exports.loginUser = async (req, res) => {
    // res.send("Welcome to Wanderlust! You are logged in!")
    req.flash("success", "Welcome to Hamro Yatra!")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}

//logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next()
        }
        req.flash("success", "logged you out")
        res.redirect("/listings")
    });
}

// Get User Profile
module.exports.userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'bookings',
            populate: {
                path: 'listing'
            }
        });
        // console.log(user.bookings);
        if (!user) {
            throw new Error('User not found');
        }
        // const confirmedBookings = user.bookings.filter(booking => booking.confirmed);
        const confirmedBookings = user.bookings.filter(booking => booking.confirmed);
        const listings = await Listing.find({ owner: req.user._id });

        res.render('users/profile.ejs', { user, confirmedBookings, listings });
        // res.render('listings/booking.ejs', { confirmedBookings });
    } catch (error) {
        console.error('Error fetching user data:', error);
        req.flash('error', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or appropriate error page
    }

    // const user = await User.findById(req.user._id).populate({
    //     path: 'bookings',
    //     populate: {
    //         path: 'listing'
    //     }
    // });

    // // const confirmedBookings = await Booking.find({ user: req.user._id, confirmed: true });
    // const confirmedBookings = user.bookings.filter(booking => booking.confirmed);

    // const listings = await Listing.find({ owner: req.user._id });
    // res.render('users/profile.ejs', { user, confirmedBookings, listings });
}
require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require('passport-local');
const User = require('./models/user')


const MONGO_URL = process.env.ATLAS_URL

main()
    .then(() => {
        console.log(" Database connected Successfully ");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.get("/listings/admin/", (req, res) => {
    throw new ExpressError(403, " Access denied");
})



app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate)



const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SECRET,
        digestAlgorithm: "sha512",
        saltLen: 24,
        keyLen: 32,
        digest: "hex"
    },
    touchAfter: 24 * 3600,
})
store.on("error", () => {
    console.error("Failed to connect to MongoDB", err);
});
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 60 * 60 * 1000,
        maxAge: 7 * 60 * 60 * 1000,
        httOnly: true
    }
}

app.use(session(sessionOptions))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user;
    next();
})


// Importing from routes
const listingRouter = require("./routes/listing")
const reviewRouter = require("./routes/review")
const userRouter = require("./routes/user")
const bookingRoutes = require("./routes/bookings")


// Using Routes
app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter)
app.use("/", bookingRoutes)


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"))
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong!" } = err;
    res.status(status).render("error.ejs", { message })
})

const port = 8081;
app.listen(port, () => {
    console.log(" Server is listening on port " + port)
})


const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../Middlewares/loginMiddleware');
const BookingCtrl = require('../controller/booking')

//Booking Route
router.post('/listings/:id/book', isLoggedIn, wrapAsync(BookingCtrl.booking));


//Show Bookings Route
router.get('/bookings/confirmed', isLoggedIn, wrapAsync(BookingCtrl.showBookings));

module.exports = router;
const Booking = require("../models/booking");
const Listing = require("../models/listing");


//Booking Controller
module.exports.booking = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Listing does not exist');
        res.redirect('/listings');
    }

    // Initialize req.user.bookings if undefined
    if (!Array.isArray(req.user.bookings)) {
        req.user.bookings = [];
    }

    if (req.user.bookings.includes(id)) {
        req.flash('error', 'You have already booked this listing');
        res.redirect(`/listings/${id}`);
    }

    // Initialize listing.bookings if undefined
    if (!Array.isArray(listing.bookings)) {
        listing.bookings = [];
    }

    const booking = new Booking({ user: req.user._id, listing: id });
    await booking.save();

    req.user.bookings.push(booking._id);
    await req.user.save();

    listing.bookings.push(booking._id);
    await listing.save();

    req.flash('success', 'Booking successful!');
    res.redirect(`/listings/${id}`);
}
//Show Bookings Controller
module.exports.showBookings = async (req, res) => {
    // Fetch confirmed bookings for the logged-in user
    const confirmedBookings = await Booking.find({ user: req.user._id, confirmed: true }).populate('listing');

    // Render the EJS template with confirmed bookings data
    res.render('listings/booking.ejs', { confirmedBookings });
}
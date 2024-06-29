const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    date: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default: true // Default to false, indicating unconfirmed booking
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

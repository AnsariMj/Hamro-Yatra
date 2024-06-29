const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
    },
    // image: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     set: (v) => v === ""
    //         ? "https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         : v,
    // },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // bookings: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Booking'
    //     }
    // ]

})

// To Delete a Review from a Review List Model as well as from Listing Model.
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {

        await Review.deleteMany(
            {
                _id: { $in: listing.reviews }
            }
        )

    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
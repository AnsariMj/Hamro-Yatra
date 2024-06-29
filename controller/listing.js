const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError")

// {1} Index Route
module.exports.index = async (req, res) => {
    const allListing = await Listing.find({})
    res.render("listings/index.ejs", { allListing })
}

// {2.0} New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
}

// 2.1 Create a New listing Route
module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid data for listing")
    }
    const data = req.body.listing;
    const newListing = new Listing(data);
    newListing.owner = req.user._id; // here i made the mistake i write req.body._id instead of req.user._id
    newListing.image = { url, filename }
    await newListing.save();
    req.flash("success", "New Listing Created")
    res.redirect("/listings")
}

// {3}  Show Route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const list = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",

            }
        })
        .populate("owner");
    // console.log(list.reviews);

    if (!list) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { list });
}

//  {4.0} Edit a new Listing Route
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/uploads/h_300, w_250")
    res.render("listings/edit.ejs", { listing, originalImageUrl })
}


// {4.1} Update  Route
module.exports.updateListing = async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid data for listing")
    }
    // let listing = await Listing.findById(id);
    // if (!listing.owner.equals(res.locals.currentUser._id)) {
    //     req.flash("error", "You don't have permission to edit")
    //     return res.redirect(`/listing/${id}`)
    // }
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        Listing.image = { url, filename }
        await Listing.save();
    }
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
}

// {5} Delete Listing Route
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const data = await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing Deleted")
    res.redirect(`/listings`)
}
const mongoose = require('mongoose');
const initData = require("./data");
const Listing = require("../models/listing")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);

}

main()
    .then(() => {
        console.log(" Database connected Successfully ");
    })
    .catch((err) => {
        console.log(err);
    });


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data.map((obj) => ({
        ...obj,
        owner: "65ecbcc246276404cb95d855"
    }));
    await Listing.insertMany(initData.data);
    console.log(" Data wa successfully initialized");

};
initDB();
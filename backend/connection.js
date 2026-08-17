const mongoose = require("mongoose");

async function connectMongoDb(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Atlas connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

module.exports = {
    connectMongoDb,
};
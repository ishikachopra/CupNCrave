const mongoose = require('mongoose');
require('dotenv').config();

const user1 = "ishika";
const dbName = "CupNCrave";
const uri = `mongodb+srv://${user1}:${process.env.MONGO_PASS}@cluster0.y0dil.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}

module.exports = connectDB;
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express ();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
const Soccer = require("./models/soccer")

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/soccer/new", (req, res) => {
    res.send("This route sends the user a form page!")
});

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});
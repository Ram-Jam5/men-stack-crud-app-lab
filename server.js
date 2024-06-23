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
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/soccer/new", (req, res) => {
    res.render("soccer/new.ejs")
});

app.get("/soccer", async (req, res) => {
    const allSoccer = await Soccer.find();
   res.render("soccer/index.ejs", { soccer: allSoccer });
});

app.post("/soccer", async (req, res) => {
   if (req.body.wonTrophyThisSeason === "on") {
    req.body.wonTrophyThisSeason = true;
   } else {
    req.body.wonTrophyThisSeason = false;
   }
   await Soccer.create(req.body);
   res.redirect("soccer");
});

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});
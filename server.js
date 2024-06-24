const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const morgan = require("morgan")
const path = require("path")


const app = express ();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
const Soccer = require("./models/soccer")

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// Shows a form to add a new team
app.get("/soccer/new", (req, res) => {
    res.render("soccer/new.ejs")
});

// Displays a list of all teams
app.get("/soccer", async (req, res) => {
    const allSoccer = await Soccer.find();
   res.render("soccer/index.ejs", { soccer: allSoccer });
});

// Displays a specific team by ID
app.get("/soccer/:soccerId", async (req, res) => {
    const foundSoccer = await Soccer.findById(req.params.soccerId)
    res.render("soccer/show.ejs", { soccer: foundSoccer })
})

//Show a form to edit an existing team
app.get("/soccer/:soccerId/edit", async (req, res) => {
    const foundSoccer = await Soccer.findById(req.params.soccerId)
    res.render("soccer/edit.ejs", {
        soccer: foundSoccer
    })
})


// Adds a new team
app.post("/soccer", async (req, res) => {
   if (req.body.wonTrophyThisSeason === "on") {
    req.body.wonTrophyThisSeason = true;
   } else {
    req.body.wonTrophyThisSeason = false;
   }
   await Soccer.create(req.body);
   res.redirect("soccer");
});


// Deletes a specific plant by its ID
app.delete("/soccer/:soccerId", async (req, res) => {
    await Soccer.findByIdAndDelete(req.params.soccerId)
    res.redirect("/soccer")
})

// Updates a specific team by its ID
app.put("/soccer/:soccerId", async (req, res) => {
    if (req.body.wonTrophyThisSeason === "on") {
        req.body.wonTrophyThisSeason = true;
    } else {
        req.body.wonTrophyThisSeason = false;
    }

    await Soccer.findByIdAndUpdate(req.params.soccerId, req.body);
    res.redirect(`/soccer/${req.params.soccerId}`)
})

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});
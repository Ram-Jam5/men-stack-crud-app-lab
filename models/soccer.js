const mongoose = require("mongoose");

const soccerSchema = new mongoose.Schema({
    name: String,
    wonTrophyThisSeason: Boolean,
});

const Soccer = mongoose.model("Soccer", soccerSchema);
module.exports = Soccer;
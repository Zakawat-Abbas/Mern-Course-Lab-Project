const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamName: String
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;


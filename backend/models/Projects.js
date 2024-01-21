const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
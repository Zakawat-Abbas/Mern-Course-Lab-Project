const mongoose = require("mongoose");

const UserStorySchema = new mongoose.Schema({
    userStory: String,
    projects: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    priority: {
        type: Number,
        default: 0
    }
    ,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const UserStory = mongoose.model("UserStory", UserStorySchema);

module.exports = UserStory;
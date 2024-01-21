const mongoose = require("mongoose");

const TaskListSchema = new mongoose.Schema({
  task: String,
  userStory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserStory',
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: String
});

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList;
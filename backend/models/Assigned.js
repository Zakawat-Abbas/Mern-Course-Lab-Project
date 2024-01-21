const mongoose = require('mongoose');

const assignedSchema = new mongoose.Schema({
  userStory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserStory',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Assigned = mongoose.model('Assigned', assignedSchema);

module.exports = Assigned;
const mongoose = require('mongoose');

const TeamRosterSchema = new mongoose.Schema({
  teamName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
});

const TeamRoster = mongoose.model('TeamRoster', TeamRosterSchema);

module.exports = TeamRoster;
const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  friendsList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;
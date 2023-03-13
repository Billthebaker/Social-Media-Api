const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  thought: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }
}, { timestamps: true });

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
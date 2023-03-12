const router = require('express').Router();
const User = require('../models/User');

// Add a friend to a user's friend list
router.post('/:id/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Remove a friend from a user's friend list
router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;
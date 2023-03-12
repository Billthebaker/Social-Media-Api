const router = require('express').Router();

// Get a list of all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Create a new user
router.post('/', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get user details by ID
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Update user details by ID
router.put('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;

  
  

  
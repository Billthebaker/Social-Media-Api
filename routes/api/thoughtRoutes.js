const router = require('express').Router();
const { Thought, User, Reaction } = require('../../models');

// Get all thoughts
router.get('/', async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
  
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Add the thought to the user's thought list
    const user = await User.findByIdAndUpdate(
      thought.userId,
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    res.status(201).json(thought);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

// Get thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');

    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update thought by ID
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);

    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      // Remove the thought from the user's thought list
      const user = await User.findByIdAndUpdate(
        thought.userId,
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      // Remove all reactions associated with the thought
      await Reaction.deleteMany({ thoughtId: thought._id });

      res.json({ message: 'Thought deleted' });
    }
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

// Add a reaction to a thought
router.post('/:id/reactions', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
  
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        const reaction = await Reaction.create(req.body);
  
        // Add the reaction to the thought's reactions list
        thought.reactions.push(reaction._id);
        await thought.save();
  
        res.status(201).json(reaction);
      }
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  });
  
 
// Add a reaction to a thought
router.post('/:id/reactions', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
  
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        const reaction = await Reaction.create(req.body);
  
        // Add the reaction to the thought's reactions list
        thought.reactions.push(reaction._id);
        await thought.save();
  
        res.status(201).json(reaction);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
 // Delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
  
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
  
        if (!reaction) {
          res.status(404).json({ message: 'Reaction not found' });
        } else {
          // Remove the reaction from the thought's reactions list
          thought.reactions.pull(reaction._id);
          await thought.save();
  
          res.status(200).json({ message: 'Reaction deleted' });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;
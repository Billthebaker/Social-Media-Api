const { Thought } = require('../models');

const thoughtController = {
  // Add a new thought
  addThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);

      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);

      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.status(200).json({ message: 'Thought deleted' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;
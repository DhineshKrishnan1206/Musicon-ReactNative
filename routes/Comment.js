const express = require('express');
const router = express.Router();
const Comment = require("../models/Comment");

router.post('/comments', async (req, res) => {
    try {
      const { songid, username, cmttxt } = req.body;
      const comment = new Comment({ songid, username, cmttxt });
      const savedComment = await comment.save();
      res.json(savedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create a comment' });
    }
  });
  router.get('/comments/:songId', async (req, res) => {
    const songId = req.params.songId;
  
    try {
      // Query the comments collection to find comments for the specified songId
      const comments = await Comment.find({ songid: songId });
  
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comments' });
    }
  });
  
  module.exports = router;
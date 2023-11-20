// routes/Playlist.js
const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

// Create a playlist
router.post('/playlists', async (req, res) => {
  try {
    const { name,image,songData } = req.body;

    // Validate if the playlist name is provided
    if (!name) {
      return res.status(400).json({ message: 'Playlist name is required' });
    }

    const playlist = new Playlist({ name,image,songData});
    await playlist.save();

    res.status(201).json({ message: 'Playlist created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getplaylists', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;

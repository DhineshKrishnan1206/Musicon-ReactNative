const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Signup

router.post('/signup', async (req, res) => {
    try {
      const { email, username, password, profilePicture } = req.body;
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Check if the username is already taken
      const existingUsername = await User.findOne({ username });
  
      if (existingUsername) {
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, username, password: hashedPassword , profileImage: profilePicture});
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/login', async (req, res) => {
    try {
      const { email, password,profileImage} = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const likedSongsCount = user.likedSongs ? user.likedSongs.length : 0;
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: '1h',
      });
  
      // Include the username in the response
      res.json({ email: user.email,
        username: user.username,
        token,
        userId: user._id,
        lcount:likedSongsCount,
        likedsongs:user.likedSongs,
        image :user.profileImage});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.post('/likeSong', async (req, res) => {
    try {
      const { userId, likedSongData } = req.body;
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the liked song data to the user's likedSongs array
      user.likedSongs.push(likedSongData);
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Song liked and stored successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.post('/unlikeSong', async (req, res) => {
    try {
      const { userId, songName } = req.body;
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the liked song with a matching name from the user's likedSongs array
      user.likedSongs = user.likedSongs.filter((song) => song.name !== songName);
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Song unliked and removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;

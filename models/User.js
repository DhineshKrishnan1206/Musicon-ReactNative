const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  likedSongs: [
    {
      songUrl: String,
      songImage: String,
      songTitle: String,
      songId: String,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);

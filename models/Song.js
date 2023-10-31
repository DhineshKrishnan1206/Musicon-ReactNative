const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songId: {
    type: String,
    required: true,
    unique: true,
  },
  songName: {
    type: String,
    required: true,
  },
  songImage: {
    type: String,
    required: true,
  },
  songUrl: {
    type: String,
    required: true,
  },
  // You can add other relevant properties for songs here
});

module.exports = mongoose.model('Song', songSchema);

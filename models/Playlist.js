const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  image :{
    type:String,
  },
  songData :[
    {
      songUrl: String,
      songImage: String,
      songTitle: String,
      songId: String,
    },
  ]
});

module.exports = mongoose.model('Playlist',playlistSchema);
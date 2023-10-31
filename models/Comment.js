const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    songid :{
        type: String,
        require:true,
    },
    username:{
        type:String,
        required:true,
    },
    cmttxt:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Comment',commentSchema);
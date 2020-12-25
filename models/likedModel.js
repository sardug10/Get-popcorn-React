const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    item:{
        type:Object,
        required:true
    }
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;
const db = require("./dbMongoose.js");
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var postSchema = new Schema({
    content: String,
    date: { type: Date, default: Date.now },
    author:String,
    like:Number,
    comment:String
});

var postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const massage = new Schema({
    Name: String,
    email: String,
    message:String,
});

const massagedata = mongoose.model("dbmassage", massage);

module.exports = massagedata;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    Name: String,
    userName: String,
    age: Number,
    password:String,
    phone:String,
    email:String,
    gender: String,
},
{timestamps:true}
);

const Userdata = mongoose.model("dbUser", User);

module.exports = Userdata;
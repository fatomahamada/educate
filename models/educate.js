const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
    fullName: String,
    age: Number,
    city:String,
    level:Number,
    phone:Number,
});

const Studentdata = mongoose.model("dbstudent", student);

module.exports = Studentdata;
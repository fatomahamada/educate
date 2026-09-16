const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    city:String,
    level:Number,
    phone:String,
    email:String,
    gender: String,
    firstLanguage:String,
    secondLanguage:String,
    univarse:String,
},
{timestamps:true}
);

const Studentdata = mongoose.model("dbstudent", student);

module.exports = Studentdata;
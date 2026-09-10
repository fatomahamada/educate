const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataschema = new Schema({
    userName: String
});

const Mydata = mongoose.model("Mydata", dataschema);

module.exports = Mydata;
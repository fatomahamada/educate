const express =require('express');
const mongoose = require('mongoose');
const app = express();
const port =3001;
const students = require("./models/educate");

// auto refresh
const path =require('path');
const livereload = require('livereload');
const LiveReloadServer =livereload.createServer();
LiveReloadServer.watch(path.join(__dirname,'public'));

const connectlivereload = require ('connect-livereload');
app.use(connectlivereload());

LiveReloadServer.server.once("connect", () =>{
    setTimeout(()=>{
        LiveReloadServer.refresh("/");
    }, 100);
});

// 
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



app.get('/', (req, res) => {
    res.render("index",{});
});

app.get('/create.html', (req, res) => {
    res.render("create",{});
});

app.get('/update.html', (req, res) => {
    res.render("update",{});
});

app.get('/show.html', (req, res) => {
    res.render("show",{});
});

app.get('/about.html', (req, res) => {
    res.render("about",{});
});

app.get('/contact.html', (req, res) => {
    res.render("contactus",{});
});

mongoose.connect('mongodb://fatma:X9cRsP.vTD4XKp5@ac-eb5lemd-shard-00-00.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-01.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-02.uroy8ia.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-yrwkbl-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{app.listen(port,()=>{
    console.log('http://localhost: ${port}');
});
})
.catch((err)=>{console.log(err)});

app.post("/create.html", (req, res) => {
    
    const mydata = new students(req.body);
    mydata.save()
    .then(()=>{res.redirect('/create.html')
    }).catch((err)=>{console.log(err)});

});


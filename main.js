const express =require('express');
const mongoose = require('mongoose');

const app = express();
const port =process.env.PORT||3001;

const allRouters = require("./routers/allRouts");

const methodoverride =require('method-override');
app.use(methodoverride('_method'));
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





mongoose.connect('mongodb://fatma:X9cRsP.vTD4XKp5@ac-eb5lemd-shard-00-00.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-01.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-02.uroy8ia.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-yrwkbl-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{app.listen(port,()=>{
    console.log('http://localhost: ${port}');
});
})
.catch((err)=>{console.log(err)});

app.use(allRouters);

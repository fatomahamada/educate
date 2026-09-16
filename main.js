const express =require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const app = express();
const port =3001;
const students = require("./models/educate");
const massages = require("./models/masage");
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



app.get('/', (req, res) => {
    students.find().then((result)=>{
        res.render("index",{arr:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
    
});

app.get('/create.html', (req, res) => {
    res.render("create",{});
});

app.get('/edit.html/:id', (req, res) => {
    students.findById(req.params.id).then((result)=>{
        res.render("update",{user:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
});

app.get('/show.html/:id', (req, res) => {
    students.findById(req.params.id).then((result)=>{
        res.render("show",{user:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
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
    .then(()=>{res.redirect('/')
    }).catch((err)=>{console.log(err)});

});

app.post("/contact.html", (req, res) => {
    
    const mas = new massages(req.body);
    mas.save()
    .then(()=>{
        res.redirect('/');
    }).catch((err)=>{console.log(err)});

});

app.post('/search', (req, res) => {
    students.find({$or:[{firstName:req.body.search},{lastName:req.body.search}]}).then((result)=>{
        res.render("search",{arr:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
    
});

app.delete("/delete/:id",(req,res)=>{
    students.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect('/');
    }).catch((err)=>{console.log(err)});
});

app.put("/edit/:id",(req,res)=>{
    students.findByIdAndUpdate(req.params.id,req.body).then(()=>{
        res.redirect('/');
    }).catch((err)=>{console.log(err)});
});
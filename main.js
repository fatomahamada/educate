const express =require('express');
const mongoose = require('mongoose');
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const port =3001;
const moment = require('moment');
const allRouters = require("./routers/allRouts");
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
app.use(cookie());

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

app.get("/login.html",(req, res) => {
    res.render("useracount/login",);
});
app.get("/register.html",(req, res) => {
    res.render("useracount/register",);
});

app.get('/logout.html',(req,res)=>{
    res.clearCookie("token");
    res.redirect('/login.html');
});

app.post("/register",async (req, res) => {
    try{
        const hashed=await bcrypt.hash(req.body.password.trim(),10);
        const user = new User({
            userName:req.body.userName,
            password:hashed,
            Name:req.body.Name,
            email:req.body.email,
            age:req.body.age,
            gender:req.body.gender,
            phone:req.body.phone,
        });
        await user.save();
        res.redirect('/');

    }
    catch(err){console.log(err);}
});


app.post("/login", async(req, res) => {

    try{
        const user=await User.findOne({ userName:req.body.userName.trim()});
        if(user){
            const isPasswordmatch=await bcrypt.compare(req.body.password.trim(),user.password);
            if(isPasswordmatch){
                const token = jwt.sign(
                    {userId:user._id,email:user.email},
                    "Fatma_super_Secret",
                    {expiresIn:'1h'}
                );
                res.cookie('token',token,{
                    httpOnly:true,
                    maxAge:3600000
                });
                res.redirect('/');
            }else{
                res.redirect('/login.html');
            }
        }
        else{
                res.redirect('/login.html');
            }
    }
    catch(err){console.log(err);}
});



mongoose.connect('mongodb://fatma:X9cRsP.vTD4XKp5@ac-eb5lemd-shard-00-00.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-01.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-02.uroy8ia.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-yrwkbl-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{app.listen(port,()=>{
    console.log('http://localhost: ${port}');
});
})
.catch((err)=>{console.log(err)});

app.use(allRouters);

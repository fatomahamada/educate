const express =require('express');
const mongoose = require('mongoose');
const app = express();
const port =3001;
const Mydata = require("./models/mydataschema");

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile('./views/index.html',{root : __dirname});
});


mongoose.connect('mongodb://fatma:X9cRsP.vTD4XKp5@ac-eb5lemd-shard-00-00.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-01.uroy8ia.mongodb.net:27017,ac-eb5lemd-shard-00-02.uroy8ia.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-yrwkbl-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{app.listen(port,()=>{
    console.log('http://localhost: ${port}');
});
})
.catch((err)=>{console.log(err)});

app.post("/", (req, res) => {
    console.log(req.body);

    const mydata = new Mydata(req.body);
    mydata.save()
    .then(()=>{res.redirect('/')
    }).catch((err)=>{console.log(err)});

});
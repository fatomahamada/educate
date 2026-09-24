
const moment = require('moment');
const massages = require("../models/masage");
const students = require("../models/educate");


const student_index_get = (req, res) => {
    students.find().then((result)=>{
        res.render("index",{arr:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
    
};

const student_create_get= (req, res) => {
    res.render("create",{});
};

const student_update_get = (req, res) => {
    students.findById(req.params.id).then((result)=>{
        res.render("update",{user:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
};


const student_show_get =  (req, res) => {
    students.findById(req.params.id).then((result)=>{
        res.render("show",{user:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
};

const student_about_get = (req, res) => {
    res.render("about",{});
};

const student_contact_get =  (req, res) => {
    res.render("contactus",{});
};

const student_post =  (req, res) => {
    
    const mydata = new students(req.body);
    mydata.save()
    .then(()=>{res.redirect('/')
    }).catch((err)=>{console.log(err)});

};
const students_post =  (req, res) => {
    
    const mas = new massages(req.body);
    mas.save()
    .then(()=>{
        res.redirect('/');
    }).catch((err)=>{console.log(err)});

};

const studen_post = (req, res) => {
    students.find({$or:[{firstName:req.body.search.trim()},{lastName:req.body.search.trim()}]}).then((result)=>{
        res.render("search",{arr:result,moment:moment});
    }).catch((err)=>{
        console.log(err);
    });
    
};

const student_delete = (req,res)=>{
    students.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect('/');
    }).catch((err)=>{console.log(err)});
};

const  student_put= (req,res)=>{
    students.findByIdAndUpdate(req.params.id,req.body).then(()=>{
        res.redirect('/');
    }).catch((err)=>{console.log(err)});
};

module.exports={student_contact_get,student_about_get,student_show_get,student_update_get
    ,student_create_get,student_index_get,student_post,students_post,studen_post,student_put,
    student_delete
};
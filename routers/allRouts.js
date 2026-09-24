const express =require('express');
const router=express.Router();
const moment = require('moment');
const students = require("../models/educate");
const massages = require("../models/masage");
const allrout= require("../controller/allcontroller");
const middelwa = require("../middelware/middelwareauth");

router.get('/',middelwa,allrout.student_index_get);

router.get('/create.html',middelwa, allrout.student_create_get);

router.get('/edit.html/:id',middelwa, allrout.student_update_get);

router.get('/show.html/:id',middelwa,allrout.student_show_get);

router.get('/about.html',middelwa, allrout.student_about_get);

router.get('/contact.html',middelwa,allrout.student_contact_get);

router.post("/create.html",middelwa,allrout.student_post);

router.post("/contact.html",middelwa,allrout.students_post);

router.post('/search',middelwa,allrout.studen_post );

router.delete("/delete/:id",middelwa,allrout.student_delete);

router.put("/edit/:id",middelwa,allrout.student_put);

module.exports = router;
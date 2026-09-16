const express =require('express');
const router=express.Router();
const moment = require('moment');
const students = require("../models/educate");
const massages = require("../models/masage");
const allrout= require("../controller/allcontroller");
router.get('/',allrout.student_index_get);

router.get('/create.html', allrout.student_create_get);

router.get('/edit.html/:id', allrout.student_update_get);

router.get('/show.html/:id',allrout.student_show_get);

router.get('/about.html', allrout.student_about_get);

router.get('/contact.html',allrout.student_contact_get);

router.post("/create.html",allrout.student_post);

router.post("/contact.html",allrout.students_post);

router.post('/search',allrout.studen_post );

router.delete("/delete/:id",allrout.student_delete);

router.put("/edit/:id",allrout.student_put);

module.exports = router;
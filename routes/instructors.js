var express = require('express');
var router = express.Router();

Class = require('../models/class');
Instructor = require('../models/instructor');
User = require('../models/user');

router.get('/classes', function(req, res, next){
	Instructor.getInstructorByUsername(req.user.username, function(err, instructor){
		if(err) throw err;
		res.render('instructors/classes', {instructor: instructor});
	});
});

router.post('/classes/register', function(req, res){
	info = [];
	info['instructor_username'] = req.user.username;
	info['class_id'] = req.body.class_id;
	info['class_title'] = req.body.class_title;

	Instructor.register(info, function(err, instructor){
		if(err) throw err;
		console.log(instructor);
	});

	req.flash('success_msg', 'You are now registered to teach this class');
	res.redirect('/instructors/classes');
});

router.get('/classes/:id/lessons/new', function(req, res, next){
	res.render('instructors/newlesson',{class_id:req.params.id});
});

router.post('/classes/:id/lessons/new', function(req, res, next){
	// Get Values
	var info = [];
	info['class_id'] = req.params.id;
	info['lesson_number'] = req.body.lesson_number;
	info['lesson_title'] = req.body.lesson_title;
	info['lesson_body'] = req.body.lesson_body;
	info['lesson_link'] = req.body.lesson_link;

	Class.addLesson(info, function(err, lesson){
		console.log('Lesson Added..');
	});

	req.flash('success_msg','Lesson Added');
	res.redirect('/instructors/classes');
});

router.get('/classes/course', function(req, res, next){
	Instructor.getInstructorByUsername(req.user.username,function(err, instructor){
		if(err) throw err;
		res.render('instructors/newcourse', { instructor: instructor });
	});
});

router.post('/classes/course', function(req, res, next){
	// Get Values
	var cl = new Class();
	
	cl.title = req.body.course_title;
	cl.description = req.body.description;
	cl.instructor = req.body.instructor_fname + " " + req.body.instructor_lname;

	cl.save( (err, doc) => {
		if(!err)
			console.log('Course Added..');
		else{
			console.log(err);
		}
	});

		
	/*
	info = [];
	info['instructor_username'] = req.user.username;
	info['class_id'] = req.body.class_id;
	info['class_title'] = req.body.class_title;

	Instructor.register(info, function(err, instructor){
		if(err) throw err;
		console.log(instructor);
	});
*/
	req.flash('success_msg','Course Added');
	res.redirect('/instructors/classes');
});


module.exports = router;
const express = require('express');
const ContactController = require('../controller/ContactController');
const TeacherController = require('../controller/TeacherController');
const CourseController = require('../controller/CourseController');
const UserController = require('../controller/UserController');
const BookingController=require('../controller/BookingController')
const router = express.Router()
const checkAuth=require('../middleware/auth');
const Booking = require('../model/Booking');



// // contact routes
// router.get('/contact',ContactController.display);
// router.post('/create',ContactController.create);
// router.get('/view/:id',ContactController.view)
// router.put('/update/:id',ContactController.update)
// router.delete('/delete/:id',ContactController.delete)




// // Teacher routes
// router.get('/teacher', TeacherController.display);
// router.post('/teachercreate', TeacherController.create);


// Course routes
router.get('/course',CourseController.display);
router.post('/course/create',CourseController.create);
router.get('/course/view/:id',CourseController.view)
router.put('/course/update/:id',CourseController.update)
router.delete('/course/delete/:id',CourseController.delete)



// user routes
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/profile',checkAuth,UserController.profile)
router.get('/logout',checkAuth,UserController.logout)



//booking
router.post('/booking/create/:courseId',checkAuth,BookingController.createBooking)
router.get('/booking/mybookings',checkAuth,BookingController.getUserBookings)
router.get('/admin/booking',checkAuth,BookingController.getAllBookings)



module.exports = router;

import express from 'express'
import { addDarja, getAllTeacher, getCourse, getCourseByTeacher, selectTeacher } from '../controllers/teacher.controller.js';


const router = express.Router();


router.patch('/', addDarja)
router.get('/', getAllTeacher)
router.post('/', selectTeacher)
router.post('/getcourse', getCourse)
router.post('/getcoursebyteacher', getCourseByTeacher)



export default router;
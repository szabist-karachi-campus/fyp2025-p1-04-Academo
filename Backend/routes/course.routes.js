import express from 'express'
import { addCourse, allCourse, getCourse, newCourse } from '../controllers/course.controller.js';


const router = express.Router();

router.post('/coursebyadmin', allCourse)
router.post('/', newCourse)
router.patch('/', addCourse)
router.post('/bydarja', getCourse)

export default router;
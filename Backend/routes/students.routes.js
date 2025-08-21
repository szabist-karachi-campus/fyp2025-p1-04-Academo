import express from 'express'
import { calculateAttendance, getAllStudents, getAttendance, getCourse, getStudent } from '../controllers/students.controller.js';

const router = express.Router();

router.post('/', getStudent);
router.put('/attendance', getAttendance)
router.post('/calculate', calculateAttendance)
router.post('/allcourse', getCourse)
router.get('/', getAllStudents)



export default router;
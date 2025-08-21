import express from 'express'
import { getTimetable, saveTimetable } from '../controllers/timetable.controller.js';

const router = express.Router();

router.post('/', saveTimetable)
router.get('/', getTimetable)

export default router;
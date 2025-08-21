import express from 'express'
import { addMarks, getMarks, getMarksByDarja } from '../controllers/marks.controller.js';

const router = express.Router();

router.post('/', addMarks)
router.get('/', getMarks)
router.post('/getmarks', getMarksByDarja)

export default router;
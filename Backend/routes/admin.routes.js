import express from 'express'
import { getSelectedAdmin, getAdmin, getCourse } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/', getSelectedAdmin);
router.get('/', getAdmin);
router.post('/course', getCourse);




export default router;
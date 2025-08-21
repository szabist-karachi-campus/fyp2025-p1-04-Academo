import express from 'express'
import { attendance } from '../controllers/attendance.controller.js';

const router = express.Router();

router.get('/', attendance);



export default router;
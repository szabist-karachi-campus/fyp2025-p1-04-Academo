import express from 'express'
import { addSubject } from '../controllers/subject.controller.js';


const router = express.Router();

router.post('/', addSubject);




export default router;
import express from 'express'
import multer from "multer";
import { resumeReview } from '../controllers/resume.controller.js';

const storage = multer.diskStorage({})

const upload = multer({ storage })

const router = express.Router();

router.post('/', upload.single('resume'), resumeReview)

export default router;
import express from 'express'
import { addEvent, allEvent } from '../controllers/event.controller.js';


const router = express.Router();

router.get('/', allEvent)
router.post('/', addEvent)

export default router;
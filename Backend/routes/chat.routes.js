import express from 'express'
import { chat, saveChat, getChat, getTitles } from '../controllers/chat.controller.js';


const router = express.Router();

router.post('/', chat)
router.post('/savechat', saveChat)
router.post('/getchat', getChat)
router.post('/gettitles', getTitles)


export default router;
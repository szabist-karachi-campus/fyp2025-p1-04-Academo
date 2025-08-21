import express from 'express'
import { allDarja, selectDarja } from '../controllers/darja.controller.js';

const router = express.Router();

router.get('/', allDarja)
router.post('/', selectDarja)

export default router;
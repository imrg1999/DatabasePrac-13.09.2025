import express from 'express';
import { registerAUser, loginUser } from '../Controller/authController.js';

const router = express.Router();

router.post('/register',registerAUser);
router.post('/login',loginUser);


export default router;
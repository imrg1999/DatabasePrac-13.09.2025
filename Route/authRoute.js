import express from 'express';
import { registerAUser, loginUser } from '../Controller/authController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerAUser);
router.post('/login',loginUser);


export default router;
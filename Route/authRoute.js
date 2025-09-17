import express from 'express';
import { 
    registerAUser, 
    loginUser, 
    userProfile 
} from '../Controller/authController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerAUser);
router.post('/login',loginUser);
router.post('/profile',authMiddleware,userProfile);


export default router;
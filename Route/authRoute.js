import express from 'express';
import { registerAUser } from '../Controller/authController.js';

const router = express.Router();

router.post('/register',registerAUser);


export default router;
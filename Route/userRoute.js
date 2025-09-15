import express from 'express';
import { 
    showAllUsers, 
    createNewUser, 
    updateUsers } from '../Controller/userController.js';


const router = express.Router();

router.get('/users',showAllUsers);
router.post('/add',createNewUser);
router.put('/update/:id',updateUsers);

export default router;
import express from 'express';
import { 
    showAllUsers, 
    createNewUser, 
    updateUsers,
deleteUsers } from '../Controller/userController.js';


const router = express.Router();

router.get('/users',showAllUsers);
router.post('/add',createNewUser);
router.put('/update/:id',updateUsers);
router.delete('/delete/:id',deleteUsers);

export default router;
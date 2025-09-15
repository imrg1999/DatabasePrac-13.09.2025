import express from 'express';
import { 
    showAllUsers, 
    createNewUser, 
    updateUsers,
    deleteUsers, 
    showUsersById } from '../Controller/userController.js';


const router = express.Router();

router.get('/users',showAllUsers);
router.post('/add',createNewUser);
router.put('/update/:id',updateUsers);
router.delete('/delete/:id',deleteUsers);
router.get('/user/:id',showUsersById);

export default router;
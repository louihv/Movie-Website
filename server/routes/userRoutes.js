import express from 'express';
import { getUsers, deleteUser, createUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/getUsers', getUsers);
router.delete('/deleteUser/:id', deleteUser);
router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);

export default router;

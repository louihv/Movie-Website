const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.get('/getUsers', userController.getUsers);
router.delete('/deleteUser/:id', userController.deleteUser);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:id', userController.updateUser);

module.exports = router;

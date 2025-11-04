const express = require('express');
const router = express.Router();
const overallController = require('../controllers/overallController');

// Define routes
router.get('/getOveralls', overallController.getOveralls);

module.exports = router;

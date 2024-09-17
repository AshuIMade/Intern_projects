const express = require('express');
const { saveBillAndSendToAPI } = require('../controllers/billController');

const router = express.Router();

// Route to handle bill data
router.post('/bills', saveBillAndSendToAPI);

module.exports = router;

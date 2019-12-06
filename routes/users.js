const express = require('express');
const router = express.Router();

const { signInUser } = require('../controllers/userController');
const pool = require('../config/mysql.config');

router.post('/authenticate', signInUser);

module.exports = router;

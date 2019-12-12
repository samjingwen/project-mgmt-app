const express = require('express');

const router = express.Router();
const passport = require('passport');
const auth = require('../config/passport.config');

const { signInUser } = require('../controllers/userController');
const pool = require('../config/mysql.config');

router.post('/authenticate', signInUser);

router.post('/register', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;

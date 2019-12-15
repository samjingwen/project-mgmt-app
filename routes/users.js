const express = require('express');

const router = express.Router();
const passport = require('passport');
const { check, validationResult, query } = require('express-validator');
const auth = require('../utils/passport.utils');

const {
  signInUser,
  getAllUsers,
  createUser,
} = require('../controllers/userController');
const pool = require('../config/mysql.config');

router.get('/all', getAllUsers);

router.post('/authenticate', signInUser);

router.post(
  '/register',
  [
    query('email').isEmail(),
    query('password').isLength({ min: 6 }),
    query('confirm').custom((value, { req }) => {
      if (value !== req.query.password) {
        console.log('error val');
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  createUser
);

module.exports = router;

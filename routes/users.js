const express = require('express');

const router = express.Router();
const passport = require('passport');
const { check, validationResult, query } = require('express-validator');
const auth = require('../utils/passport.utils');

const { signInUser, getAllUsers } = require('../controllers/userController');
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
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('params:', req.query);
    res.json({ message: 'success' });
  }
);

module.exports = router;

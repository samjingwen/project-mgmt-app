const express = require('express');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

const auth = require('../config/passport.config');

const router = express.Router();

auth(passport);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.send('succcess');
  }
);

module.exports = router;

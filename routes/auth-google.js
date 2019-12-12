const express = require('express');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

const auth = require('../utils/passport.utils');

const router = express.Router();

auth.signInByGoogle(passport);

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
    console.log(req.user);
    if (req.user.token) {
      res.json({
        token_type: 'GoogleOAuth',
        access_token: req.user.token,
      });
    } else {
      res.json({
        status: 'Something went wrong',
      });
    }
  }
);

module.exports = router;

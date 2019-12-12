require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { getUserById } = require('../controllers/userController');

module.exports = { signInByJwt, signInByGoogle };

function signInByJwt(passport) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        issuer: 'productivv',
      },
      function(jwt_payload, done) {
        getUserById(jwt_payload.sub).then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        });
      }
    )
  );
}

function signInByGoogle(passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      (token, refreshToken, profile, done) => {
        done(null, {
          profile,
          token,
        });
      }
    )
  );
}

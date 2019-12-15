require('dotenv').config();
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { getUserById } = require('../controllers/userController');

const signInByJwt = passport => {
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
};

const signInByGoogle = passport => {
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
};

const validateToken = (req, res, next) => {
  console.log(req.headers.authorization);
  const authorizationToken = req.headers.authorization;
  let result;
  if (authorizationToken) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      issuer: 'productivv',
    };
    try {
      result = jwt.verify(token, process.env.JWT_SECRET, options);

      req.decoded = result;
      console.log(req.decoded);
      next();
    } catch (err) {
      res.status(401).json({ error: err });
    }
  } else {
    result = {
      error: `Authentication error. Token required or not valid.`,
      status: 401,
    };
    res.status(401).send(result);
  }
};

module.exports = { signInByJwt, signInByGoogle, validateToken };

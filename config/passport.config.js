require('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');

const { getUserById } = require('../services/user.service');


module.exports = (passport) => {
  passport.use(new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      issuer: 'productivv',

    },
    function (jwt_payload, done) {
      getUserById(jwt_payload.sub)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
    }
  ))
}
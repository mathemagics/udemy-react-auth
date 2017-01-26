const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// set up options for jwt strategy
const jwtOptions = {
  jwfFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

//create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user id in the payload exists in the database, if it
  // does, call done with that user
  // otherwise call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });

});

//tell passport to use this strategy
passport.use(jwtLogin)

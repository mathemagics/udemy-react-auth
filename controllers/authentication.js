const User = require('../models/user');

exports.signup = function(req, res, next) {
  // see if a user with given email exists
  const email = req.body.email;
  const password = req.body.password;

  // if user email already exists, return error
  User.findOne({ email: email }, function(err, existingUser) {
     
  });

  // if user with email does not exist. create and save user record.

  // respond to request indicating the user was created
}

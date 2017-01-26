const User = require('../models/user');

exports.signup = function(req, res, next) {
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  // see if a user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {
     if (err) { return next(err); }
     console.log(existingUser);
     // if user email already exists, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email in use' });
    }
    // if user with email does not exist. create and save user record.
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ success: true });
    });
  });

  // respond to request indicating the user was created
}

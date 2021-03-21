const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = '';
  console.log(
    'For testing purposes. The login submitted was email: ' +
      email +
      ' and password: ' +
      password
  );
  //Controls
  if (!name || !email || !password || !password2) {
    errors += 'Please fill in all fields.';
  }
  if (password !== password2) {
    errors += `Passwords doesn't match.`;
  }
  if (password.length < 6) {
    errors += 'Your password must be at least 6 characters long.';
  }
  if (errors !== '') {
    res.render('register', {
      message: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    User.findOne({ email: email }).exec((err, user) => {
      if (err) console.log(err);
      if (user) {
        errors += 'Email already registered.';
        res.render('register', {
          message: errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.log(err);
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Save pass to hash
            newUser.password = hash;
            //Save user
            newUser
              .save()
              .then((value) => {
                console.log('The following user was created:');
                console.log(value);
                const message = 'You have now registered!';
                res.render('login', { message });
              })
              .catch((value) => console.log(value));
          });
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/channels',
    failureRedirect: '/users/login',
  })(req, res, next);
});

module.exports = router;
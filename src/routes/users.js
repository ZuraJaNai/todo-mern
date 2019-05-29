const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const saveUser = (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(returnerUser => res.json(returnerUser))
        .catch(saveErr => console.log(saveErr));
    };
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, saveUser);
    });
  });
});

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const { email } = req.body;
  const { password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        const saveToken = (err, token) => res.status(200).json({
          token: `Bearer ${token}`,
        });
        // Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1d' }, saveToken);
      } else {
        return res.status(400).json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;

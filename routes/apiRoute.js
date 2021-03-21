const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const User = require('../models/user');
const { ensureAuthenticated } = require('../config/auth.js');
router.use(express.json());

router.get('/channels', ensureAuthenticated, (req, res) => {
  Channel.find({ private: false }, (err, channels) => {
    if (err) return handleError(err);
    res.status(200).json(channels);
  });
});

router.get('/users', ensureAuthenticated, (req, res) => {
  User.find({}, (err, users) => {
    if (err) return handleError(err);
    res.status(200).json(users);
  });
});

module.exports = router;
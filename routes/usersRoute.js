const express = require('express');
const { rawListeners } = require('../models/user');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const User = require('../models/user');

router.post('/register', (req, res) => {
  console.log(req.body);
  res.end();
});

module.exports = router;

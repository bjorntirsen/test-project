const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const Channel = require('../models/channel');
const Post = require('../models/post');

function renderChannel(id, response) {
  Channel.findById(id, (err, data) => {
    if (err) return console.error(err);
    response.render('channel.ejs', { channel: data });
  });
}

router.get('/:id', (req, res) => {
  renderChannel(req.params.id, res);
});

router.post('/:id', (req, res) => {
  console.log(req.body);
  renderChannel(req.params.id, res);
});

module.exports = router;

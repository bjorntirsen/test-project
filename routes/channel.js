const path = require('path');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use('/public', express.static(path.join(__dirname, 'public')));

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
  if (req.body.content == undefined) {
    alert('Username and Post cannot be empty');
  } else {
    const post = new Post({
      by: req.body.by,
      content: req.body.content || '',
    });
    //console.log(req.body);
  }
  renderChannel(req.params.id, res);
});

module.exports = router;

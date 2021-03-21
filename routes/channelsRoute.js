const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const Post = require('../models/post');

const { ensureAuthenticated } = require('../config/auth.js');
router.use(express.urlencoded({ extended: true }));

router.get('/', ensureAuthenticated, (req, res) => {
  Channel.find((err, data) => {
    if (err) return console.error(err);
    res.render('index.ejs', { channels: data, user: req.user });
  });
});

router.post('/create', ensureAuthenticated, (req, res) => {
  const channel = new Channel({
    name: req.body.name,
    description: req.body.description || '',
    private: req.body.private ? true : false,
  });
  channel.save((err) => {
    if (err) return console.error(err);
    console.log('Channel created.');
    res.redirect('/channels');
  });
});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
  Channel.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) return console.error(err);
    console.log(req.params.id + 'deleted');
    res.redirect('/channels');
  });
});

//Handle individual channel

router.get('/:id', ensureAuthenticated, (req, res) => {
  Channel.findById(req.params.id, (err, channel) => {
    if (err) return console.error(err);
    res.render('channel.ejs', { channel: channel, user: req.user });
  });
});

router.post('/:id', ensureAuthenticated, (req, res) => {
  const post = new Post({
    by: req.user.name,
    byId: req.user._id,
    content: req.body.content,
  });
  Channel.updateOne(
    { _id: req.params.id },
    { $push: { posts: post } },
    (err) => {
      if (err) return console.error(err);
      res.redirect(`/channels/${req.params.id}`);
    }
  );
});

//DMorProfile
router.get('/DMorProfile/:id', ensureAuthenticated, (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    res.redirect('/users/profile');
  } else {
    res.send('<h1>Here we will add DM functionality</h1>');
  }
});

module.exports = router;

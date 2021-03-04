const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

const Channel = require('./models/channel');
const Post = require('./models/post');

app.get('/channel/:id', (req, res) => {
  Channel.findById(req.params.id, (err, data) => {
    if (err) return console.error(err);
    res.render('channel.ejs', { channel: data });
  });
});

app.post('/channel/:id', (req, res) => {
  console.log(req.body)
  Channel.findById(req.params.id, (err, data) => {
    if (err) return console.error(err);
    res.render('channel.ejs', { channel: data });
  });
})

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

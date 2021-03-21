const path = require('path');
const express = require('express');
const app = express();
const expressEjsLayout = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(expressEjsLayout);
app.use('/public', express.static(path.join(__dirname, 'public')));

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

const indexRouter = require('./routes/indexRoute');
const channelRouter = require('./routes/channelRoute');

app.use('/', indexRouter);
app.use('/channel/', channelRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

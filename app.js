require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const dbUrl = 'mongodb://localhost:27017/tracker';
const ExpressError = require('./utils/ExpressError');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
});

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

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
const MongoStore = requires('connect-mongoose');
const session = require('express-session');
const User = require('./Models/Users');
const users = require('./routes/users');
const reminders = require('./routes/reminders');
const timers = require('./routes/timer');
const toDos = require('./routes/toDos');
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
});

app.use(
  session({
    secret: secret,
    resave: true,
    saveUnitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
  })
);

store.on('error', function (e) {
  console.log('SESSION STORE ERROR', e);
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStraregy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', users);
app.use('/reminders', reminders);
app.use('/timer', timers);
app.use('/toDos', toDos);

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).json(err);
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

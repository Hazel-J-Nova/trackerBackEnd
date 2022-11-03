const { Router } = require('express');
const catchAsync = require('../utils/catchAsync');
const { isUser } = require('../utils/middleware');
const timer = require('../controllers/reminders');

Router.route('/:userId').get(
  isUser,
  catchAsync(timer.showAllTimers).post(isuser, catchAsync(timer.createTimer))
);

Router.route('/:userId/:timerId')
  .get(isUser, catchAsync(timer.showOneTimer))
  .put(
    isUser,
    catchAsync(pauseTimer).delete(isUser, catchAsync(timer.deleteTimer))
  );

module.exports.Router;

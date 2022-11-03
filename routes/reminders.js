const { Router } = require('express');
const reminders = require('../controllers/reminders');
const catchAsync = require('../utils/catchAsync');
const { isUser } = require('../utils/middleware');

Router.route('/reminder/:userId')
  .get(isUser, catchAsync(reminders.getAllReminder))
  .post(
    isUser,
    catchAsync(reminders.createReminder).put(
      isUser,
      catchAsync(reminders.updateReminder)
    )
  );

Router.route('/reminder/:userId/:reminderId')
  .get(isUser, catchAsync(reminders.getOneReminder))
  .delete(isUser, catchAsync(reminders.deleteReminder))
  .put(isUser, catchAsync(reminder.updateReminder));

module.exports.Router;

const { Router } = require('express');
const reminders = require('../controllers/reminders');

Router.route('/reminder').get(reminders.getAllReminder);

Router.route('/reminder/:reminderId')
  .get(reminders.getOneReminder)
  .post(reminders.createReminder);

const Reminders = require('../models/Reminders');
const date = require('date-and-time');
const timer = require('../timers/index');
const { DateTime } = require('luxon');
const schedule = require('node-schedule');
const sendMessage = require('../twilio/index');
const User = require('../models/Reminders');

module.exports.createReminder = async (req, res) => {
  const { dueDate, repeat, name, timeTillRepeat, message } = req.body;
  const user = Users.findById(req.params);

  const number = user.phoneNumber;
  const now = DateTime.now();
  const timeDue = dueDate - now;
  const reminder = await new Reminders(
    user,
    dueDate,
    repeat,
    timeTillRepeat,
    name,
    message
  );
  await reminder.save();
  user.reminders.push(reminder);
  await user.save();
  const reminderTimer = timer(reminder._id, dueDate, (message, number) => {
    const job = schedule.scheduleJob(name, dueDate, async (message, number) => {
      sendMessage(message, number);
      const findReminder = await Reminders.findById(reminder._id);
      if (findReminder.repeat === false) {
        let currentJob = schedule.scheduledJobs[reminder._id];
        currentJob.cancel();
      } else {
      }
      let currentJob = schedule.scheduleJobs[reminder._id];
      currentJob.reschdule(
        DateTime.local().plus({ days: reminder.timeTillRepeat })
      );
    });
  });
  res.json(reminder);
};

module.exports.getOneReminder = async (req, res) => {
  const { reminderId } = req.body;
  const reminder = await Reminder.findById(reminderId);
  res.send(reminder);
};

module.exports.getReminders = async (req, res) => {
  const user = req.user;
  const userReminders = user.reminders.populate(res.json(userReminders));
};

module.exports.deleteReminder = async (req, res) => {
  const { reminderId, userId } = req.params;
  const user = await User.findById(userId);
  const deletedReminder = await Reminders.findByIdAndDelete(reminderId);
  const reminderJob = await schedule.scheduledJobs.reminderId;
  await reminderJob.cancel();
  user.reminders = user.reminders.filter((reminder) => {
    reminder !== deletedReminder;
  });
  await user.save();
  res.send(deletedReminder);
};

module.exports.updateReminder = async (req, res) => {
  const { renminderId } = req.params;
  const reminderToUpdate = await Reminder.findById(reminderId);
  const reminderProps = req.body;
  for (let [key, value] in reminderProps) {
    remidnerToUpdate[key] = value;
  }
  await reminderToUpdate.save();
  const message = reminderToUpdate.message;
  const name = reminderToUpdate.name;
  const reminderJob = await schedule.scheduledJobs.reminderId;
  await reminderJob.cancel();
  const reminderTimer = timer(
    reminderId,
    reminderToUpdate.dueDate,
    (message, number) => {
      const job = schedule.scheduleJob(
        name,
        dueDate,
        async (message, number) => {
          sendMessage(message, number);
          const findReminder = await Reminders.findById(reminder._id);
          if (findReminder.repeat === false) {
            let currentJob = schedule.scheduledJobs[reminder._id];
            currentJob.cancel();
          } else {
          }
          let currentJob = schedule.scheduleJobs[reminder._id];
          currentJob.reschdule(
            DateTime.local().plus({ days: reminder.timeTillRepeat })
          );
        }
      );
    }
  );
};

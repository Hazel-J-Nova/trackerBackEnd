const Reminders = require('../models/Reminders');
const date = require('date-and-time');
const timer = require('../timers/index');
const { DateTime } = require('luxon');
const schedule = require('node-schedule');
const sendMessage = require('../twilio/index');

module.exports.createReminder = async (req, res) => {
  const { dueDate, repeat, name, timeTillRepeat, message } = req.body;
  const user = req.user;
  const number = user.number
  const now = DateTime.now();
  const timeDue = dueDate - now;
  const reminder = await new Reminders(
    user,
    dueDate,
    repeat,
    timeTillRepeat,
    name
  );
  await reminder.save()
  const reminderTimer = timer(reminder._id, dueDate, (message, number) => {
    const job = schedule.scheduleJob(name, dueDate, (message, number) => {
      sendMessage(message, number);
      const findReminder = await Reminders.findById(reminder._id)
      if (findReminder.repeat===false){
          let currentJob = schedule.scheduledJobs[reminder._id]
          currentJob.cancel()
      }else{

      }
      let currentJob = schedule.scheduleJobs[reminder._id]
      currentJob.reschdule(DateTime.local().plus({days:reminder.timeTillRepeat}))
    });
  });
};


module.exports.getOneReminder = async(req,res)=>{
    const {reminderId} = req.body
    const reminder = await Reminder.findById(reminderId)
    res.send(reminder)
}

modyle.exports.getReminder = async (req,res )=>{
    const allReminders = await Reminders.find({})
    res.send(allReminders)
}
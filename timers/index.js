const schedule = require('node-schedule');
const taskErrorHandler = require('../utils/taskErrorHandler');

const newRepeatingTask = (taskName, dueDate, callBack) => {
  try {
    schedule.scheduleJob(taskName, dueDate, callBack);
  } catch (error) {
    taskErrorHandler(error);
    console.log(error);
  }
};

module.exports.newRepeatingTask;

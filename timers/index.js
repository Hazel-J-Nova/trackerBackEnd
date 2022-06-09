const schedule = require('node-schedule');
const date = require('date-and-time');
const taskErrorHandler = require('../utils/taskErrorHandler');

const newRepeatingTask = (taskName, dueDate, callBack) => {
  try {
    schedule.scheduleJob(taskName, dueDate, callBack);
  } catch (error) {
    taskErrorHandler(error);
    console.log(error);
  }
};
const now = new Date();

newRepeatingTask('job', '*/1    *    *    *    *    *', () => {
  console.log('butts');

  let currentJob = schedule.scheduledJobs['job'];
  currentJob.cancel();
});

// const job = schedule.scheduleJob('print', date.addSeconds(now, 10), () => {
//   console.log('ten seconds');
//   job.cancel();
// });
// job.reschedule('data', date.addSeconds(17), () => {
//   console.log('farts');
// });

module.exports.newRepeatingTask;

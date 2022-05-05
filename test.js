const schedule = require("node-schedule");
const date = require("date-and-time");

const someDate = new Date();

const nextMinute = date.addMinutes(someDate, 1);
// schedule.scheduleJob(nextMinute, () => {
//   console.log("job ran");
// });

const thirtySec = date.addSeconds(someDate, 10);
const six = schedule.scheduleJob(thirtySec, () => {
  console.log("first job");
});
const five = schedule.scheduleJob("*/5 * * * * *", () => {
  console.log("i ran in 5 secs");
});

console.log(five);
console.log(six);
// const two = schedule.scheduleJob("*/2 * * * * *", () => {
//   console.log("i ran in 2 secs");
// });

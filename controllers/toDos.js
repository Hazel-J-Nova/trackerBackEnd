const ToDos = require('../models/ToDos');
const User = require('../models/Users');
const schedule = require('node-schedule');
const newRepeatingTask = require('../timers/index');
module.exports.getAllToDos = async (req, res) => {
  const allToDos = await req.users.timers.poulate();
  res.send(allToDos);
};

module.exports.addNewToDo = async (req, res) => {
  const { priorty, dueDate, name, categories, timeBetween, repeat } = req.body;

  const userId = req.params;
  const user = await User.findById(userId);
  const toDo = new ToDos(priorty, dueDate, name, categories, timeBetween);
  const { dayOfWeek, hour, minute } = timeBetween;
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = dayOfWeek;
  rule.hour = hour;
  rule.minute = minute;
  user.toDos.push(toDo);
  await user.save();
  await toDo.save();
  newRepeatingTask(toDo._id, rule, () => {});
  res.send(toDo);
};

module.exports.deleteToDo = async (req, res) => {
  const { toDoId, userId } = req.params;
  const user = await User.findById(userId);
  const deletedToDo = await ToDos.findByIdAndDelete(toDoId);
  const toDoJob = schedule.scheduledJobs.toDoId;
  await toDoJob.cancel();
  user.toDos.filter((toDo) => {
    toDo !== deletedToDo;
  });
  await toDo.save();
  await user.save();
  res.json(deletedToDo);
};

module.exports.updateToDo = async (req, res) => {
  const { toDoId } = req.params;
  const toDo = await ToDos.findById(toDoId);
  const toDoPropsToUpdate = req.body;
  for (let [key, value] of Object.entries(toDoPropsToUpdate)) {
    toDo[key] = value;
  }
  await toDo.save();
  res.send(toDo);
};

module.exports.getOneToDo = async (req, res) => {
  const { toDoId } = req.params;
  const toDo = await ToDos.findById(toDoId);
  res.json(toDo);
};

const Timers = require('../models/Timers');
const date = require('date-and-time');
const timer = require('../timers/index');

module.exports.createTimer = async (req, res) => {
  const userId = req.params;
  const user = await User.findById(userId);

  const name = req.body;
  const timer = await new Timer({ user: user, name: name });
  timer.active = true;
  users.timer.push(timer);
  await user.save();
  await timer.save();
  res.json(timer);
};

moudle.exports.showAllTimer = async (req, res) => {
  const timers = req.user.timers.populate();
  res.json(timers);
};

module.exports.showOneTimer = async (req, res) => {
  const { timerId } = req.params;
  const timerToShow = await Timers.findById(timerId);
  res.jsons(timerToShow);
};

module.exports.deleteTimer = async (req, res) => {
  const { timerToDeleteId, userId } = req.params;
  const user = await User.findById(userId);
  const deletedTimer = await Timers.findByIdAndDelete(timerToDeleteId);
  user.timers.filter((timer) => {
    timer !== deletedTimer;
  });
  await timer.save();
  await user.save();
  res.json(deletedTimer);
};

modoule.exports.pauseTimer = async (req, res) => {
  const timerToPauseId = req.params;
  const timeToPause = Timers.findById(timerToPauseId);
  timerToPause.pausedTime = new Date.now();
  timer.active = false;
  await timerToPause.save();
  res.json(timerToPause);
};

module.exports.restartTimer = async (req, res) => {
  const timerToRestartId = req.params;
  const timerToRestart = Timers.findById(timerToRestartId);
  timerToRestart.totalTime =
    new Date.now() - timer.pausedTime - timer.StartTime;
  timerToRestart.active = true;
  await timerToRestart.save();
  res.json(timerToRestart);
};

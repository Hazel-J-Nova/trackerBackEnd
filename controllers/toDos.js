const ToDos = require('../models/ToDos');
const User = require('../models/Users');
const newRepeatingTask = require('../timers/index');
module.exports.getAllToDos = async (req, res) => {
  const allToDos = await ToDos.find({});
  res.send(allToDos);
};

module.exports.addNewToDo = async (req, res) => {
  const { priorty, dueDate, name, categories, timeBetween,repeat } = req.body;

  const userId = req.params;
  const user = await User.findById(userId);
  const toDo = new ToDos(priorty, dueDate, name, categories, timeBetween);
  const {dayOfWeek,hour,minute} =timeBetween
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek=dayOfWeek
rule.hour =hour
rule.minute = minute
newRepeatingTask(toDo._id,rule,()=>{

})
  res.send(toDo);
};

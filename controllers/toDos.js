const ToDos = require('../models/ToDos');
const User = require('../models/Users');
c;

module.exports.getAllToDos = async (req, res) => {
  const allToDos = await ToDos.find({});
  res.send(allToDos);
};

module.exports.addNewToDo = async (req, res) => {
  const { priorty, dueDate, name, categories, timeBetween } = req.body;

  const userId = req.params;
  const user = await User.findById(userId);
  const toDo = new ToDos(priorty, dueDate, name, categories, timeBetween);
  res.send(toDo);
};

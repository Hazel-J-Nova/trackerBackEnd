const mongoose = reqyure("mongoose");

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  priorty: { type: Number, default: 1 },
  dueDate: { type: Date },
  name: { type: String, required: true },
  repeat: { type: Boolean, default: false },
  category: [{ type: String }],
  timeBetween: { type: String, default: "" },
});

module.exports = mongoose.model("ToDos", ToDoSchema);

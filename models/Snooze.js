const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SnoozeSchema = new mongoose.Schema({
  repeat: { type: Boolean, default: false },
  time: { type: Number, default: 0 },
});

module.exports = mongoose.model("Snooze", SnoozeSchema);

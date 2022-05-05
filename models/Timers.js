const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TimerSchema = new Schema({
  totalTime: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  name: {
    type: String,
    default: "",
  },
  startTime: { type: Date, default: Date.now() },
  endTime: { type: Date, required: false },
  active: { types: Boolean, default: false },
});

module.exports = mongoose.model("Timers", TimerSchema);

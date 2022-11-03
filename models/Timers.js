const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TimerSchema = new Schema({
  totalTime: {
    type: Number,
  },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: {
    type: String,
    default: '',
  },
  startTime: { type: Date, default: Date.now() },
  endTime: { type: Date, required: false },
  active: { type: Boolean, default: false },
  pausedTime: { type: Date, required: false },
});

module.exports = mongoose.model('Timers', TimerSchema);

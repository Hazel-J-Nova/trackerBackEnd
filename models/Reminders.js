const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SnoozeSchema = require('./Snooze');

const RemindersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  dueDate: { type: Date },
  repeat: { type: Boolean, default: false },
  timeTillRepeat: { type: String, default: '' },
  name: { type: String, default: '' },
  active: { type: Boolean, default: true },
  message: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Reminders', RemindersSchema);

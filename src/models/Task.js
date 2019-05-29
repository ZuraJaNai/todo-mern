const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

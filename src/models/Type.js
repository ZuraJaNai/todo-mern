const mongoose = require('mongoose');

const { Schema } = mongoose;

const TypeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
const Type = mongoose.model('Type', TypeSchema);
module.exports = Type;

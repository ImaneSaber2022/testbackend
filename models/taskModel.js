const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  description: String,
  starting_date: {
    type: Date,
    required: true,
  },
  ending_date: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
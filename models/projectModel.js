const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing',
  },
  starting_date: {
    type: Date,
    required: true,
  },
  ending_date: Date,
});

module.exports = mongoose.model('Project', projectSchema);
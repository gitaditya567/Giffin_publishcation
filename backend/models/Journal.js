const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a journal title'],
    unique: true,
    trim: true,
  },
  issn: {
    type: String,
    required: [true, 'Please add an ISSN'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  frequency: {
    type: String,
    default: 'Quarterly',
  },
  indexing: {
    type: [String],
    default: ['Google Scholar', 'Crossref'],
  },
  impactFactor: {
    type: String,
    default: 'Not Applicable',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Journal', JournalSchema);

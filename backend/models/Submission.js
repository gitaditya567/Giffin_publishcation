const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authors: {
    type: String,
    required: [true, 'Please add author(s) name(s)'],
    trim: true,
  },
  abstract: {
    type: String,
    required: [true, 'Please add an abstract or summary'],
  },
  type: {
    type: String,
    enum: ['book', 'chapter', 'journal'],
    required: [true, 'Please select the type of submission'],
  },
  targetPublication: {
    type: String, // E.g. Name of edited book, journal, or target series
    required: [true, 'Please specify the target publication or journal'],
  },
  fileUrl: {
    type: String,
    required: [true, 'Please upload your file/manuscript'],
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'accepted', 'rejected'],
    default: 'pending',
  },
  adminComments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', SubmissionSchema);

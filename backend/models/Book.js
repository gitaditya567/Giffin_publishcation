const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a book title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please add an author name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  coverImage: {
    type: String,
    default: '/placeholder-book.jpg',
  },
  fileUrl: {
    type: String, // PDF link for E-books
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['paperback', 'ebook'],
    required: [true, 'Please specify the book type'],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);

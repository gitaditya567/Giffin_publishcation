const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all books (with filters)
// @route   GET /api/books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, type, isFeatured, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }
    if (isFeatured) {
      query.isFeatured = isFeatured === 'true';
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

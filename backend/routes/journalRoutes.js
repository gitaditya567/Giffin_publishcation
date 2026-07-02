const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all journals
// @route   GET /api/journals
// @access  Public
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ title: 1 });
    res.status(200).json({ success: true, count: journals.length, data: journals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get a single journal
// @route   GET /api/journals/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ success: false, error: 'Journal not found' });
    }
    res.status(200).json({ success: true, data: journal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Create a journal
// @route   POST /api/journals
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const journal = await Journal.create(req.body);
    res.status(201).json({ success: true, data: journal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Update a journal
// @route   PUT /api/journals/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!journal) {
      return res.status(404).json({ success: false, error: 'Journal not found' });
    }
    res.status(200).json({ success: true, data: journal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete a journal
// @route   DELETE /api/journals/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) {
      return res.status(404).json({ success: false, error: 'Journal not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

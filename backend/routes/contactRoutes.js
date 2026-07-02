const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/auth');

// @desc    Submit a contact inquiry
// @route   POST /api/contacts
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Get all contact inquiries
// @route   GET /api/contacts
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

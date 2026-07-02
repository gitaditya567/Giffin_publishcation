const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Submission = require('../models/Submission');
const { protect, authorize } = require('../middleware/auth');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents (.doc, .docx) are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// @desc    Submit a publication proposal (book, chapter, or journal article)
// @route   POST /api/submissions
// @access  Private (User or Author)
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a manuscript file' });
    }

    const { title, authors, abstract, type, targetPublication } = req.body;

    // Build public file path
    const fileUrl = `/uploads/${req.file.filename}`;

    const submission = await Submission.create({
      title,
      authors,
      abstract,
      type,
      targetPublication,
      fileUrl,
      submittedBy: req.user.id,
    });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Get submissions of the current user
// @route   GET /api/submissions/my
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const submissions = await Submission.find({ submittedBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Update submission status / reviews
// @route   PUT /api/submissions/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, adminComments } = req.body;
    let submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status, adminComments },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;

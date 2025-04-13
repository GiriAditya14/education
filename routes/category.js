import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// @route   GET /api/categories/college/:type
// @desc    Get college teachers by institution type
router.get('/college/:type', protect, async (req, res) => {
  try {
    const teachers = await Teacher.find({ 
      category: 'college',
      institutionType: req.params.type 
    });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/categories/youtube
// @desc    Get YouTube teachers
router.get('/youtube', protect, async (req, res) => {
  try {
    const teachers = await Teacher.find({ category: 'youtube' });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/categories/edtech/:platform
// @desc    Get edtech teachers by platform
router.get('/edtech/:platform', protect, async (req, res) => {
  try {
    const teachers = await Teacher.find({ 
      category: 'edtech',
      platform: req.params.platform 
    });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/categories/teacher/:id
// @desc    Get single teacher profile
router.get('/teacher/:id', protect, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
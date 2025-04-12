import express from 'express'; 
import Feedback from "../models/Feedback.js"; 
import User from "../models/user.js"; 
import { protect, isTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/teachers/me/stats
// @desc Get current teacher's feedback stats 

router.get('/me/stats', protect, isTeacher, async (req, res) => { 
    try { 
        const feedbacks = await Feedback.find({ 
            teacher: req.user._id 
        });

        const total = feedbacks.length;
        const average =
        total === 0
            ? 0
            : feedbacks.reduce((sum, f) => sum + f.rating, 0) / total;

        res.json({
            totalReviews: total,
            averageRating: parseFloat(average.toFixed(2)),
            feedbacks
        });
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ 
            message: 'Failed to fetch teacher stats' 
        }); 
    } 
});

export default router;
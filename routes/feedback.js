import express from 'express'; 
import Feedback from '../models/Feedback.js'; 
import Question from '../models/Question.js'; 
import { protect, isStudent } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route POST /api/feedback 
// @desc Student submits feedback after session 

router.post('/', protect, isStudent, async (req, res) => { 
    const { questionId, rating, feedbackText } = req.body;

    try { const question = await Question.findById(questionId); if (!question || !question.isAccepted) { return res.status(400).json({ message: 'Invalid or unanswered question' }); }

        if (question.student.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only review your own question' });
        }

        const alreadyGiven = await Feedback.findOne({ question: questionId });
        if (alreadyGiven) {
            return res.status(400).json({ message: 'Feedback already submitted' });
        }

        const feedback = await Feedback.create({
            question: questionId,
            student: req.user._id,
            teacher: question.acceptedBy,
            rating,
            feedbackText
        });

        res.status(201).json(feedback);
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ 
            message: 'Failed to submit feedback' 
        }); 
    } 
});

export default router;
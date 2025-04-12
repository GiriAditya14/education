import express from 'express'; 
import Question from '../models/Question.js'; 
import { protect, isStudent, isTeacher } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route POST /api/questions
// @desc Student submits a question 

router.post('/', protect, isStudent, async (req, res) => { 
    const { text, imageUrl } = req.body;

    try { 
        const question = new Question({ 
            student: req.user._id, 
            text, 
            imageUrl 
        });

        const saved = await question.save();
        res.status(201).json(saved);
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ 
            message: 'Failed to submit question' 
        });
    } 
});

// @route GET /api/questions/open 
// @desc Teacher fetches open questions 

router.get('/open', protect, isTeacher, async (req, res) => { 
    try { 
        const openQuestions = await Question.find({ isAccepted: false }).populate('student', 'name email'); 
        res.json(openQuestions); 
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ 
            message: 'Error fetching questions' 
        }); 
    } 
});

// @route POST /api/questions/:id/accept 
// @desc Teacher accepts a question 

router.post('/:id/accept', protect, isTeacher, async (req, res) => { 
    try { 
        const question = await Question.findById(req.params.id); 
        if (!question || question.isAccepted) { 
            return res.status(404).json({ 
                message: 'Question not available' 
            }); 
        }

        question.isAccepted = true;
        question.acceptedBy = req.user._id;
        await question.save();

        res.json({ message: 'Question accepted', question });
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ 
            message: 'Error accepting question' 
        }); 
    } 
});

// @route GET /api/questions/my 
// @desc Get user's own questions (student or teacher) 

router.get('/my', protect, async (req, res) => { 
    try { 
        let questions; 
        if (req.user.role === 'student') { 
            questions = await Question.find({ student: req.user._id }); 
        } 
        else { 
            questions = await Question.find({ 
                acceptedBy: req.user._id 
            }); 
        }
        res.json(questions);
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ 
            message: 'Error fetching questions' 
        }); 
    } 
});

export default router;
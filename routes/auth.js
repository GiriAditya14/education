import express from 'express'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
import User from "../models/User.js";

import { protect, isTeacher } from "../middleware/authMiddleware.js";


dotenv.config(); 
const router = express.Router();

// Utility function to generate JWT 
const generateToken = (user) => { 
    return jwt.sign( { 
        id: user._id, 
        role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { 
        expiresIn: '7d' 
    }); 
};

// @route POST /api/auth/register 
// @desc Register new user 
// @access Public 

router.post('/register', async (req, res) => { 
    const { name, email, password, role } = req.body;
    try { 
        const userExists = await User.findOne({ email }); 
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, role });
        const token = generateToken(user);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ message: 'Server error' }); 
    } 
});

// @route POST /api/auth/login 
// @desc Login user & get token 
// @access Public 

router.post('/login', async (req, res) => { 
    const { email, password } = req.body;

    try { 
        const user = await User.findOne({ email }); 
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = generateToken(user);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).json({ message: 'Server error' }); 
    } 
});

router.post('/something', protect, isTeacher, (req, res) => { 
    // secure teacher logic 
});

export default router;
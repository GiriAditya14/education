import jwt from 'jsonwebtoken'; 
import User from '../models/user.js';

export const protect = async (req, res, next) => { 
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) { 
        try { 
            token = req.headers.authorization.split(' ')[1]; 
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = await User.findById(decoded.id).select('-password'); 
            next();
        } 
        catch (error) { 
            console.error(error); 
            return res.status(401).json({ message: 'Not authorized, token failed' }); 
        } 
    }

    if (!token) return res.status(401).json({ message: 'Not authorized, no token' }); 
};

export const isTeacher = (req, res, next) => { 
    if (req.user?.role === 'teacher') return next(); 
    return res.status(403).json({ 
        message: 'Access denied. Teachers only.' 
    }); 
};

export const isStudent = (req, res, next) => { 
    if (req.user?.role === 'student') return next(); 
    return res.status(403).json({ 
        message: 'Access denied. Students only.' 
    }); 
};
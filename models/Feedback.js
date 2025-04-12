import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({ 
    question: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question', 
        required: true, 
        unique: true 
    }, 
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    }, 
    feedbackText: { 
        type: String, 
        trim: true 
    } 
    }, { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema); 
export default Feedback;
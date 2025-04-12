import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({ 
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    imageUrl: String, 
    text: String, 
    isAccepted: { 
        type: Boolean, 
        default: false 
    }, 
    acceptedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }, 
        createdAt: { 
            type: Date, 
            default: Date.now 
        } 
    }
);

const Question = mongoose.model('Question', questionSchema); 
export default Question;
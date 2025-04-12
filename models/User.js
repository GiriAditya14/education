import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    { 
        name: { 
            type: String, 
            required: true, 
            trim: true 
        }, 
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true 
        }, 
        password: { 
            type: String, 
            required: true 
        }, 
        role: { 
            type: String, 
            enum: ['student', 'teacher'], 
            required: true 
        }, 
        rating: { 
            type: Number, 
            default: 0 
        } 
    }, 
    { timestamps: true });

// Password hash before saving 
userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) return next(); 
    try { 
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt); 
        next(); 
    } 
    catch (err) { 
        next(err); 
    } 
});

// Compare entered password with hashed password 
userSchema.methods.matchPassword = async function (enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password); 
};

const User = mongoose.model('User', userSchema); 
export default User;
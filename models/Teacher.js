import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['college', 'edtech', 'youtube'],
    required: true
  },
  institutionType: {
    type: String,
    enum: ['iit', 'nit', 'iiit', 'others'],
    required: function() { return this.category === 'college'; }
  },
  platform: {
    type: String,
    required: function() { return this.category === 'edtech'; }
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  students: {
    type: Number,
    default: 0
  },
  bio: {
    type: String
  },
  image: {
    type: String
  }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
// // At the top of server/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { Server } = require("socket.io");

// Load routes with CommonJS
import authRoutes from '../routes/auth.js';
import questionRoutes from '../routes/question.js';
import feedbackRoutes from '../routes/feedback.js';
import teacherRoutes from '../routes/teacher.js';
import zegoRoutes from '../routes/zego.js';
import categoryRoutes from '../routes/category.js';
import aiRoutes from '../routes/ai.js';

// Initialize
const app = express();
dotenv.config();

// Middlewares
// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/zego", zegoRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('new-question', (data) => {
    io.emit('broadcast-question', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});

// // quality-education-platform/server/index.js

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "../routes/auth.js";
// import questionRoutes from "../routes/question.js";
// import feedbackRoutes from "../routes/feedback.js";
// import teacherRoutes from "../routes/teacher.js";
// import zegoRoutes from "../routes/zego.js";
// import categoryRoutes from "../routes/category.js"; 
// import aiRoutes from '../routes/ai.js';
// import { Server } from "socket.io";

// const app = express();
// dotenv.config();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/question", questionRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/zego', zegoRoutes);
// app.use('/api/categories', categoryRoutes); 
// app.use('/api/ai', aiRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const server = app.listen(process.env.PORT || 5000, () => console.log("Server running") ); 
// const io = new Server(server, { 
//   cors: { 
//     origin: '*', 
//     methods: ['GET', 'POST'] 
//   } 
// });

// io.on('connection', (socket) => { 
//   console.log('🟢 A user connected');

//   socket.on('new-question', (data) => { 
//     // Broadcast to all teachers 
//     io.emit('broadcast-question', data); 
//   });

//   socket.on('disconnect', () => { 
//     console.log('🔴 A user disconnected'); 
//   }); 
// });

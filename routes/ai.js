import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateContent } from '../controllers/aiController.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const response = await generateContent(prompt);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default router;

// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import { generateContent } from '../controllers/aiController.js';

// const router = express.Router();

// router.post('/', protect, async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }
//     const response = await generateContent(prompt);
//     res.status(200).json({ response });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// });

// export default router;


// // routes/ai.js
// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import { generateContent } from '../controllers/aiController.js';

// const router = express.Router();

// router.post('/', protect, async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }
//     const response = await generateContent(prompt);
//     res.status(200).json({ response });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// });

// export default router; // ✅ Use export default

// const express = require('express');
// const { protect } = require('../middleware/authMiddleware');
// const { generateContent } = require('../controllers/aiController');

// const router = express.Router();

// router.post('/', protect, async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }
//     const response = await generateContent(prompt);
//     res.status(200).json({ response });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// });

// module.exports = router;

// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import { generateContent } from '../controllers/aiController.js';

// const router = express.Router();

// router.post('/', protect, async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }
//     const response = await generateContent(prompt);
//     res.status(200).json({ response });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;
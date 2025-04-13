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


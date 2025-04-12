import express from 'express'; 
import { protect } from "../middleware/authMiddleware.js";
import crypto from 'crypto'; 
import dotenv from 'dotenv'; 

dotenv.config();

const router = express.Router();

const generateZegoToken = (appId, userId, serverSecret, effectiveTimeInSeconds) => { 
    const now = Math.floor(Date.now() / 1000); 
    const expire = now + effectiveTimeInSeconds; 
    const nonce = Math.floor(Math.random() * 100000); 
    const payload = { 
        app_id: appId, 
        user_id: userId, 
        nonce: nonce, 
        ctime: now, 
        expire: expire 
    }; 
    const payloadStr = JSON.stringify(payload); 
    const hash = crypto 
        .createHmac('sha256', serverSecret) 
        .update(payloadStr) 
        .digest('hex');

    const token = Buffer.from( 
        JSON.stringify({ ...payload, token: hash }) 
    ).toString('base64');

    return token; 
};

// @route GET /api/zego/token 
// @desc Generate Zego token 

router.get('/token', protect, (req, res) => { 
    const userId = req.user._id.toString(); 
    const appId = parseInt(process.env.ZEGO_APP_ID); 
    const serverSecret = process.env.ZEGO_SERVER_SECRET; 
    const token = generateZegoToken(appId, userId, serverSecret, 3600);

    res.json({ appId, userId, token }); 
});

export default router;
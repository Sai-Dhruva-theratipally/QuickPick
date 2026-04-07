import express from 'express';
import { processChatAndAddToCart, getChatHistory, clearChatHistory } from '../controllers/chatController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

// POST /api/chat/process
router.post('/process', authUser, processChatAndAddToCart);

// POST /api/chat (alias so all frontend components work)
router.post('/', authUser, processChatAndAddToCart);

// GET /api/chat/history — fetch chat history for logged-in user
router.get('/history', authUser, getChatHistory);

// DELETE /api/chat/history — clear chat history for logged-in user
router.delete('/history', authUser, clearChatHistory);

export default router;

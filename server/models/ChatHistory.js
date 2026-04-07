import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    messages: [{
        sender: { type: String, enum: ['user', 'ai'], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const ChatHistory = mongoose.models.chatHistory || mongoose.model('chatHistory', chatHistorySchema);

export default ChatHistory;

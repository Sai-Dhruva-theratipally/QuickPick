import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from '../server/configs/db.js';
import 'dotenv/config';
import userRouter from '../server/routes/userRoute.js';
import sellerRouter from '../server/routes/sellerRoute.js';
import connectCloudinary from '../server/configs/cloudinary.js';
import productRouter from '../server/routes/productRoute.js';
import cartRouter from '../server/routes/cartRoute.js';
import addressRouter from '../server/routes/addressRoute.js';
import orderRouter from '../server/routes/orderRoute.js';
import chatRouter from '../server/routes/chatRoute.js';

const app = express();

let dbConnected = false;
let cloudinaryConnected = false;

// Initialize connections once
async function initializeConnections() {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
  
  if (!cloudinaryConnected) {
    try {
      await connectCloudinary();
      cloudinaryConnected = true;
      console.log('Cloudinary connected');
    } catch (error) {
      console.error('Cloudinary connection error:', error);
    }
  }
}

// Initialize connections on first request
app.use(async (req, res, next) => {
  await initializeConnections();
  next();
});

// Allow multiple origins (read from CLIENT_URLS env var or fallback to localhost)
const allowedOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Health check
app.get('/', (req, res) => res.send("API is Working"));

// Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/chat', chatRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

export default app;

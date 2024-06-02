import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath function

import connectDB from './config/db.js';

//Routes
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';
import postRoutes from './routes/post.routes.js'; 

const __filename = fileURLToPath(import.meta.url); // Convert the current module's URL to a file path
const __dirname = path.dirname(__filename); // Get the directory path

const app = express();

// Config
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files (like images) from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/posts', postRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

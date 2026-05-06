const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// .env file load karo
dotenv.config();

// Import routes (EK BAAR DECLARE KARO)
const authRoutes = require('./routes/auth');
// const contactRoutes = require('./routes/contact');
const analyzeRoutes = require('./routes/analyze');

const app = express();

// CORS setup - Frontend se connection ke liye
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true
}));

app.use(express.json());

// Health check API
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Use routes (EK BAAR USE KARO)
app.use('/api/auth', authRoutes);
// app.use('/api/contact', contactRoutes);
app.use('/api/analyze', analyzeRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully!');
        console.log(' Database:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('MongoDB Connection Failed!');
        console.error('Error:', err.message);
    });

// 404 handler - agar route na mile to
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: `Route ${req.method} ${req.url} not found` 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error!' 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log(` Auth routes: /api/auth/register, /api/auth/login`);
    console.log(` Contact routes: /api/contact/submit`);
    console.log(` Analyze routes: /api/analyze`);
});
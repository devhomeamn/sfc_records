const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const authRoutes = require('./backend/routes/authRoutes');
const recordRoutes = require('./backend/routes/recordRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
    })
);

// MongoDB Atlas Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });

// API Routes
app.use('/auth', authRoutes);
app.use('/records', recordRoutes);
app.use('/users', userRoutes);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Fallback route for serving index.html for unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('MongoDB URI:', process.env.MONGO_URI);


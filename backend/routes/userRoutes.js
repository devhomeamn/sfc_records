const express = require('express');
const User = require('../models/User'); // Adjust path based on your project structure
const router = express.Router();

// Route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, { fullName: 1, username: 1, serviceNo: 1, mobileNo: 1, _id: 0 });
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
module.exports = router;

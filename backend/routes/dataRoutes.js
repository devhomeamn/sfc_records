const express = require('express');
const Section = require('../models/Section');

const router = express.Router();


// Fetch all sections with their categories
router.get('/sections', async (req, res) => {
    try {
        const sections = await Section.find({}, { name: 1, categories: 1 }); // Fetch name and categories
        res.status(200).json({ sections });
    } catch (err) {
        console.error('Error fetching sections:', err);
        res.status(500).json({ message: 'Failed to fetch sections', error: err.message });
    }
});


// Add a new section
router.post('/section', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Section name is required' });
        }

        const section = new Section({ name });
        await section.save();
        res.status(201).json({ message: 'Section added successfully', section });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ message: 'Section name must be unique' });
        } else {
            console.error('Error adding section:', err);
            res.status(500).json({ message: 'Failed to add section', error: err.message });
        }
    }
});

// Add a category to a section
router.post('/category', async (req, res) => {
    try {
        const { sectionName, category } = req.body;

        if (!sectionName || !category) {
            return res.status(400).json({ message: 'Both sectionName and category are required' });
        }

        const section = await Section.findOne({ name: sectionName });

        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }

        if (section.categories.includes(category)) {
            return res.status(409).json({ message: 'Category already exists in this section' });
        }

        section.categories.push(category);
        await section.save();
        res.status(200).json({ message: 'Category added successfully', section });
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ message: 'Failed to add category', error: err.message });
    }
});

module.exports = router;

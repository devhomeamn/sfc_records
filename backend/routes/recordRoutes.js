const express = require('express');
const Record = require('../models/Record');
const mongoose = require('mongoose');

const router = express.Router();

// Add Record
router.post('/add', async (req, res) => {
    try {
        const {
            sectionName,
            category,
            bdNumber,
            shelveNumber,
            closingDate,
            enteredBy,
            concernTS,
            centralRecordRoom,
            roomNo,
        } = req.body;

        // Validate required fields
        if (!sectionName || !category || !bdNumber || !enteredBy || !concernTS || !centralRecordRoom) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate centralRecordRoom and roomNo
        if (centralRecordRoom === 'No' && !roomNo) {
            return res.status(400).json({ error: 'Room No is required when Central Record Room is "No"' });
        }

        // Find the latest serial number for the section
        const lastRecord = await Record.findOne({ sectionName }).sort({ _id: -1 });
        let newSerialNumber = 1;

        if (lastRecord) {
            // Extract the numeric part of the last serial number
            const lastSerial = lastRecord.serialNumber.split('-').pop();
            newSerialNumber = parseInt(lastSerial, 10) + 1;
        }

        const serialNumber = `${sectionName}-${newSerialNumber}`; // Generate the new serial number

        const newRecord = new Record({
            serialNumber,
            sectionName,
            category,
            bdNumber,
            shelveNumber,
            closingDate,
            enteredBy,
            concernTS,
            centralRecordRoom,
            roomNo: centralRecordRoom === 'No' ? roomNo : null, // Conditionally include roomNo
        });

        await newRecord.save();
        res.status(201).json({ message: 'Record added successfully', record: newRecord });
    } catch (error) {
        console.error('Error adding record:', error);
        res.status(500).json({ error: 'Failed to add record', details: error.message });
    }
});

// GET /records - Fetch all records or search by BD number
router.get('/', async (req, res) => {
    try {
        const { bdNumber } = req.query;
        const filters = {};

        if (bdNumber) {
            filters.bdNumber = bdNumber; // Exact match for BD number
        }

        const records = await Record.find(filters);
        res.status(200).json({ message: 'Records fetched successfully', records });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Failed to fetch records', details: error.message });
    }
});


router.get('/:id', async (req, res) => {
    console.log('Fetching record with ID:', req.params.id);

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid record ID format.' });
    }

    try {
        const record = await Record.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.put('/:id', async (req, res) => {
    console.log('Update Request ID:', req.params.id);
    console.log('Update Data:', req.body);

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid record ID format.' });
    }

    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record updated successfully', record });
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
//delete 

router.delete('/:id', async (req, res) => {
    console.log('Delete Request ID:', req.params.id);

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid record ID format.' });
    }

    try {
        const record = await Record.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
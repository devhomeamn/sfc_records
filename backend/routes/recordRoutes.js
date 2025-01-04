const express = require('express');
const Record = require('../models/Record');

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

        const serialNumber = `SN-${Date.now()}`
         // unique serial number 

        // Validate centralRecordRoom and roomNo
        if (centralRecordRoom === 'No' && !roomNo) {
            return res.status(400).json({ error: 'Room No is required when Central Record Room is "No"' });
        }

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
        res.status(400).json({ error: 'Error adding record', details: error.message });
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
        res.status(200).json({ records });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Failed to fetch records' });
    }
});

module.exports = router;

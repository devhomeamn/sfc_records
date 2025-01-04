const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    serialNumber: { type: String, unique: true },
    sectionName: { type: String, required: true },
    category: { type: String, required: true },
    bdNumber: { type: String, required: true },
    shelveNumber: { type: String, required: true },
    closingDate: { type: String, required: true },
    enteredBy: { type: String, required: true },
    concernTS: { type: String, required: false }, // New field for Concern TS
    centralRecordRoom: { type: String, enum: ['Yes', 'No'], required: true }, // New field for Central Record Room
    roomNo: { type: String, required: function () { return this.centralRecordRoom === 'No'; } }, // New field for Room No
});




module.exports = mongoose.model('Record', RecordSchema);

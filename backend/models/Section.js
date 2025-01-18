const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    categories: { type: [String], default: [] }
});

module.exports = mongoose.model('Section', SectionSchema);

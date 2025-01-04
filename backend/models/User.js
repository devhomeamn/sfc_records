const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, unique: true },
    serviceNo: { type: String, unique: true },
    mobileNo: String,
    password: String,
});




module.exports = mongoose.model('User', UserSchema);

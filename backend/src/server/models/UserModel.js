const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: String,
    location: String,
    description: String,
    photo: String,
    topics: [String]
});

module.exports = mongoose.model('User', userSchema);

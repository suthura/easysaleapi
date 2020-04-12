const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    usertype: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    }
});

module.exports = mongoose.model('User', userSchema);
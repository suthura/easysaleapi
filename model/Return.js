const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },

    description: {
        type: String,
        required: true,
    },

    returnDate: {
        type: Date,
        required: true,
    },

    userID: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Return', returnSchema);
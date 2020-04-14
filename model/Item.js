const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    price: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    stock: {
        type: Number,
        required: true,
    },

    userID: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Item', itemSchema);
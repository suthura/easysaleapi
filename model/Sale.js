const mongoose = require('mongoose');

const SaleDataSchema = new mongoose.Schema({
    itemName: {
        type: String
    },
    quantity: {
        type: String
    },
    itemTotal: {
        type: String
    }
});

const salesSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    saledata: [SaleDataSchema],
    total: {
        type: String
    },
    saletime: {
        type: Date
    }
});

module.exports = mongoose.model('Sale', salesSchema);
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Transactions = mongoose.model('Transactions', transactionSchema);

module.exports = Transactions;
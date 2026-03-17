const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    investor: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    investmentAmount: {
        type: Number,
        required: true
    },
    equityStake: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    timestamps: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model('Investment', investmentSchema);
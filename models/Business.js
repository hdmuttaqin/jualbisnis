const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    owner: { type: String, required: true },
    askingPrice: { type: Number, required: true },
    monthlyRevenue: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    views: { type: Number, default: 0 },
    timestamps: { type: Date, default: Date.now }
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['business_owner', 'investor', 'admin'],
        required: true
    },
    profileImage: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    companyName: {
        type: String
    },
    verificationStatus: {
        type: Boolean,
        default: false
    },
    documents: [{
        type: String
    }],
    bankAccount: {
        type: String
    },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
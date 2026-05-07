const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'read', 'replied'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Contact', contactSchema);
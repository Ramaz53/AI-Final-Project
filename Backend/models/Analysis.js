const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String },
    results: {
        plastic: { type: Number, default: 0 },
        paper: { type: Number, default: 0 },
        organic: { type: Number, default: 0 }
    },
    overallVerdict: { type: String },
    confidence: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

//  YEH LINE CHANGE KARI HAI - 'analysis' collection name add kiya
module.exports = mongoose.model('Analysis', analysisSchema, 'analysis');
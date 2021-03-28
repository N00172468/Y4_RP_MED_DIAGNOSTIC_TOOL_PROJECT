const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
    username: { type: String, required: false },
    title: { type: String, required: true },
    // body: { type: String, required: true },
    overview: { type: String, required: true },
    symptoms: { type: String, required: true },
    causes: { type: String, required: true },
    risk_factors: { type: String, required: true },
    complications: { type: String, required: true },
    prevention: { type: String, required: true }
}, {
    timestamps: true,
});

infoSchema.index({'$**': 'text'});


const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
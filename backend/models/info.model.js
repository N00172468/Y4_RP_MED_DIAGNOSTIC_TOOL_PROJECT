const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
    username: { type: String, required: false },
    title: { type: String, required: true },
    body: { type: String, required: true },
    // experience: { type: Number, required: true },
    // date: { type: Date, required: true }
}, {
    timestamps: true,
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
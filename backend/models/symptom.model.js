const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const symptomSchema = new Schema({
    symptom: { type: String, required: true },
    old_id: { type: String },
}, {
    timestamps: true,
});

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;
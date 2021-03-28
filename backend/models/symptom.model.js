const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const symptomSchema = new Schema({
    symptom: { type: String, required: true },
    old_id: { type: String },
}, {
    timestamps: true,
});
symptomSchema.index({'$**': 'text'});

const Symptom = mongoose.model('Symptom', symptomSchema);


module.exports = Symptom;
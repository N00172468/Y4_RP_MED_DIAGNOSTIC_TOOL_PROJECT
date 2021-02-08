const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const knowledgeSchema = new Schema({
    username: { type: String, required: true },
    // comment_id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true,
});

const Knowledge = mongoose.model('Knowledge', knowledgeSchema);

module.exports = Knowledge;
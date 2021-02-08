const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    username: { type: String, required: true },
    // info_id: { type: String, required: true }, ...can be null
    // knowledge_id: { type: String, required: true }, ...can be null
    comments: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
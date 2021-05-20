const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    // username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    stickyNote: { type: String, required: true },
    flashcard: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true,
});

noteSchema.index({'$**': 'text'
});
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
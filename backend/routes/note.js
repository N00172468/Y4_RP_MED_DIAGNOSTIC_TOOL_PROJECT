const router = require('express').Router();
let Note = require('../models/note.model');

router.route('/').get((req, res) => {
    Note.find()
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const body = req.body.body;
    const stickyNote = req.body.stickyNote;
    const flashcard = req.body.flashcard;
    const image = req.body.image;

    const newNote = new Note({
        username,
        title,
        body,
        stickyNote,
        flashcard,
        image,
    });

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.username = req.body.username;
            note.title = req.body.title;
            note.body = req.body.body;
            note.stickyNote = req.body.stickyNote;
            note.flashcard = req.body.flashcard;
            note.image = req.body.image;

            note.save()
                .then(() => res.json('Note Updated!'))
                .catch(err => res.status(400).json('Erro: ' + err));
        })
        .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
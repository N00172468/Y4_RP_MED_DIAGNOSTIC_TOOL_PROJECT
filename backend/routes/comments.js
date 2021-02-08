const router = require('express').Router();
let Comments = require('../models/comments.model');

router.route('/').get((req, res) => {
    Comments.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    // const info_id = req.body.comment_id;
    // const knowledge_id = req.body.comment_id;
    const comments = req.body.comments;

    const newComments = new Comments({
        username,
        // info_id,
        // knowledge_id,
        comments
    });

    newComments.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Comments.findById(req.params.id)
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Comments.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comments Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Comments.findById(req.params.id)
        .then(comments => {
            comments.username = req.body.username;
            comments.comments = req.body.comments;

            comments.save()
                .then(() => res.json('Comment Updated!'))
                .catch(err => res.status(400).json('Erro: ' + err));
        })
        .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
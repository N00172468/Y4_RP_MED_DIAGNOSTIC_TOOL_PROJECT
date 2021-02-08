const router = require('express').Router();
let Knowledge = require('../models/knowledge.model');

router.route('/').get((req, res) => {
    Knowledge.find()
        .then(knowledge => res.json(knowledge))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    // const comment_id = req.body.comment_id;
    const title = req.body.title;
    const body = req.body.body;
    const image = req.body.image;

    const newKnowledge = new Knowledge({
        username,
        // comment_id,
        title,
        body,
        image,
    });

    newKnowledge.save()
        .then(() => res.json('Knowledge added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Knowledge.findById(req.params.id)
        .then(knowledge => res.json(knowledge))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Knowledge.findByIdAndDelete(req.params.id)
        .then(() => res.json('Knowledge Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Knowledge.findById(req.params.id)
        .then(knowledge => {
            knowledge.username = req.body.username;
            knowledge.title = req.body.title;
            knowledge.body = req.body.body;
            knowledge.image = req.body.image;

            knowledge.save()
                .then(() => res.json('Knowledge Updated!'))
                .catch(err => res.status(400).json('Erro: ' + err));
        })
        .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
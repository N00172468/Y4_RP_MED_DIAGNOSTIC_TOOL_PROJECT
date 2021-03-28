const router = require('express').Router();

const Symptom = require('../models/symptom.model');
const Note = require('../models/note.model');
const Knowledge = require('../models/knowledge.model');
const Info = require('../models/info.model');
const Comments = require('../models/comments.model');

const models = [Symptom, Note, Knowledge, Info, Comments];

// 🦆

router.route('/:keyword').get((req, res) => {
    const {keyword} = req.params

    Promise.all(
        models.map(model =>  model.find({"$text": {"$search": keyword}}))
    ).then(result => {

        const response = {
            names: models.map(model => model.collection.collectionName),
            data: result
        }
        
        return res.status(200).json(response)
    }).catch(err => {
        console.log('error', err)
        return res.status(400).json('Error: ' + err);
    })
});


module.exports = router;
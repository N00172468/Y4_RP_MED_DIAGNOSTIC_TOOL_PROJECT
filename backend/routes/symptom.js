const router = require('express').Router();
let Symptom = require('../models/symptom.model');

router.route('/').get((req, res) => {
    Symptom.find()
        .then(symptom => res.json(symptom))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const symptom = req.body.symptom;
    const old_id = req.body.old_id;

    const newSymptom = new Symptom({
        symptom,
        old_id
    });

    newSymptom.save()
        .then(() => res.json('Symptom added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bulkAdd').post((req, res) => {
    const symptoms = req.body;
    let successfulSaves = 0;
    
    symptoms.forEach(symptom => {
        const newSymptom = new Symptom({
            symptom: symptom.Name,
            old_id: symptom.ID
        });
    
        newSymptom.save()
            .then(() => {
                successfulSaves++
            }) 
            .catch(err => res.status(400).json('Error: ' + err));    
    })


    return res.status(200).json({
        message: `${successfulSaves} / ${symptoms.length} Symptoms Saved `
    })

    // const newSymptom = new Symptom({
    //     symptom,
    //     old_id
    // });

    // newSymptom.save()
    //     .then(() => res.json('Symptom added!'))
    //     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Symptom.findById(req.params.id)
        .then(symptom => res.json(symptom))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Symptom.findByIdAndDelete(req.params.id)
        .then(() => res.json('Symptom Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Symptom.findById(req.params.id)
        .then(symptom => {
            symptom.symptom = req.body.symptom;
            symptom.old_id = req.body.old_id;

            symptom.save()
                .then(() => res.json('Symptom Updated!'))
                .catch(err => res.status(400).json('Erro: ' + err));
        })
        .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
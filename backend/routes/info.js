const router = require('express').Router();
let Info = require('../models/info.model');

router.route('/').get((req, res) => {
    Info.find()
        .then(info => res.json(info))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    // const body = req.body.body;
    const overview = req.body.overview;
    const symptoms = req.body.symptoms;
    const causes = req.body.causes;
    const risk_factors = req.body.risk_factors;
    const complications = req.body.complications;
    const prevention = req.body.prevention;

    const newInfo = new Info({
        username,
        title,
        // body,
        overview,
        symptoms,
        causes,
        risk_factors,
        complications,
        prevention
    });

    newInfo.save()
        .then(() => res.json('Info added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Info.findById(req.params.id)
        .then(info => res.json(info))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Info.findByIdAndDelete(req.params.id)
        .then(() => res.json('Info Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Info.findById(req.params.id)
        .then(info => {
            info.username = req.body.username;
            info.title = req.body.title;
            // info.body = req.body.body;
            info.overview = req.body.overview;
            info.symptoms = req.body.symptoms;
            info.causes = req.body.causes;
            info.risk_factors = req.body.risk_factors;
            info.complications = req.body.complications;
            info.prevention = req.body.prevention;

            info.save()
                .then(() => res.json('Info Updated!'))
                .catch(err => res.status(400).json('Erro: ' + err));
        })
        .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
const Clarifai = require('clarifai');

//Clarifai api key.
const app = new Clarifai.App({
	apiKey: '68b7aff4f7f249a4a717359ae81506fa'
});

const handleApiCall = () => (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=> {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work API'))
};

// Handles image put route.
const handleImagePut = (db) => (req, res) => {
    const { id, faces } = req.body;
    //console.log(faces);
    // select user and update entries.
    db('users').where('id', '=', id)
        .increment({
            entries: faces
        })
        .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries.'));
};

module.exports = {
    handleImagePut: handleImagePut,
    handleApiCall: handleApiCall
};
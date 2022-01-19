
const router = require('express').Router();
let Pack = require('../models/pack.model');

router.route('/').get((req, res) => {
  Pack.find()
    .then(packs => res.json(packs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// CREATE
router.route('/add').post((req, res) => {
  const {author, title, description, banner_url, download_url, tags } = req.body;
  const date = Date.parse(req.body.date);

  const newPack = new Pack({
    author,
    title,
    description,
    banner_url,
    download_url,
    tags
  });

  newPack.save()
  .then(doc => res.json(`Pack '${title}' added with id: ${doc.id}`))
  .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/:id').get((req, res) => {
  Pack.findById(req.params.id)
  .then(pack => res.json(pack))
  .catch(err => res.status(400).json(`Error: ${err}`));
});

// UPDATE
router.route('/:id/update').post((req, res) => {
  Pack.findById(req.params.id)
  .then(pack => {
    pack.author = req.body.author,
    pack.title = req.body.title,
    pack.description = req.body.description,
    pack.banner_url = req.body.banner_url,
    pack.download_url = req.body.download_url,
    pack.tags = req.body.tags
  })
  .catch(err => res.status(400).json(`Error: ${err}`));
});

// DELETE
router.route('/:id').delete((req, res) => {
  Pack.findByIdAndDelete(req.params.id)
  .then(() => res.json(`Pack ${req.body.title} (${req.params.id}) deleted!`))
  .catch(err => res.status(400).json(`Error: ${err}`));
});

// DELETE ALL - COMMENT THIS OUT BEFORE U DEPLOY BRO
router.route('/').delete((req, res) => {
  Pack.deleteMany({}, ()=>res.json("Deleted all packs"));
});

module.exports = router;
const bcrypt = require('bcrypt')
const router = require('express').Router();
let User = require('../models/user.model');

// CREATE
router.route('/add').post((req, res) => {
  const {email, username, password, avatar_url, userClass } = req.body;

  // Hash & salt the password
  bcrypt.hash(password, 10)
  .then(hashedPassword => {

    // Create a new user object w/ the encrypted password and save it.
    const newUser = new User({email, username, password:hashedPassword, userClass, avatar_url});
    newUser.save()
      .then(user => res.status(201).send(`"Successfully added user '${user.username}' with id '${user.id}'`))
      .catch(() => res.status(400).send("Error adding new user."));
  })
  .catch(err => res.status(400).send("Error hashing."));
});

// READ
// Gets all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Gets user by id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(() => res.status(400).send("Error finding user."))
});

// Authenticate user
router.route('/login').post((req, res) => {
  User.findOne({"email": req.body.email})
  .then(user => {
    bcrypt.compare(req.body.password, user.password)
    .then(success => success ? res.send("Authenticated") : res.send("Wrong password"))
  })
  .catch(() => res.status(500).send("Error authenticating user."))
});

// UPDATE
// Updates a user's username and password.
router.route('/:id/update').post((req, res) => {
  User.findByIdAndUpdate(req.params.id, {username:req.body.username, password:req.body.password})
  .then(() => res.json('User updated!'))
  .catch(() => res.status(400).send("Error updating user."))
});

// DELETE
// Deletes a user.
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => res.status(200).send())
  .catch(() => res.status(400).send("Error deleting user."))
});

// DELETE ALL - COMMENT THIS OUT BEFORE U DEPLOY BRO
router.route('/').delete((req, res) => {
  User.deleteMany({}, ()=>res.json("Deleted all users"));
});

module.exports = router;
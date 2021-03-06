const bcrypt = require('bcrypt')
const router = require('express').Router();
const jwt = require('jsonwebtoken')
let User = require('../models/user.model');

// CREATE

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

// UPDATE
// Updates a user's password.
router.route('/:id/changepassword').post((req, res) => {
  const { password } = req.body;

  // Find the user by id.
  User.findById(req.params.id)
  .then(user => {
    
    // Compare the incoming password w/ the one on the database. If it's a new password, hash and update. Otherwise, return a 400.
    bcrypt.compare(password, user.password)
    .then(isUnchanged => {
      if (!isUnchanged) {

        // Hash + salt new password, update the database.
        bcrypt.hash(password, 10)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.save()
          .then(() => res.status(200).send("Succesfully updated password."))
          .catch(() => res.status(500).send("Error updating password."))
        })
        .catch(() => res.status(500).send("Error hashing."));
      }
       
      else {
        res.status(400).send("Error: Password is unchanged.")
      }
    })
    .catch(() => res.status(500).send("Error asserting password."))
  })
  .catch(() => res.status(400).send("Error finding user."))
});

// Update other stuff but password.
router.route('/:id/update').post((req, res) => {
  const {email, username, avatar_url, user_class} = req.body;

  // Find the user by id.
  User.findByIdAndUpdate(req.params.id, {email, username, avatar_url, user_class})
  .then(() => res.status(200).send("Successfully updated user."))
  .catch(() => res.status(400).send("Error finding user."))
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
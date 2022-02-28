const bcrypt = require('bcrypt')
const router = require('express').Router();
const jwt = require('jsonwebtoken')
let User = require('../models/user.model');

// Middleware to verify if a JWT is valid
const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'].split(" ")[1]; // Header should say "Bearer <token>" so we split on space

  if (!token) {
    res.send("Could not verify JWT")
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
          if (err) {
            res.json({auth:false, message:"Could not authenticate"})
          } else {
            req.userId = decoded.id;
            next();
          }
    })
  }
}

router.route('/').get(verifyJWT, (req, res) => {
  User.findById(req.userId)
  .then(user => {
    if(user) {
      res.json({auth:true, user:user})
    }
    else {
      res.send({auth:false, message:"Could not authenticate"})
    }
  })
  
});

router.route('/signup').post((req, res) => {
  const {email, username, password, avatar_url, user_class } = req.body;

  // Hash & salt the password
  bcrypt.hash(password, 10)
  .then(hashedPassword => {
  
    // Create a new user object w/ the encrypted password and save it.
    const newUser = new User({email, username, password:hashedPassword, user_class, avatar_url});
    newUser.save()
      .then(user => {
        // Create a web token
        const token = jwt.sign(
          {id:newUser.id},
          process.env.JWT_SECRET,
          {
            expiresIn: "2h"
          }
        )

        newUser.token = token;
        newUser.save();

        res.status(201).send(`"Successfully added user '${user.username}' with id '${user.id}'`)
      })
      .catch(() => res.status(400).send("Error adding new user."));
  })
  .catch(err => res.status(500).send("Error hashing."));
});

// Authenticate user
router.route('/login').post((req, res) => {
  User.findOne({"email": req.body.email}) 
  .then(user => {
    bcrypt.compare(req.body.password, user.password)
    .then(success => {
      if (success) {

        // On success, create a token for the user.
        const id = user._id;
        req.session.user = user;

        // Create a token
        const token = jwt.sign(
          {id: id},
          process.env.JWT_SECRET,
          {
            expiresIn: "2h"
          }
        )

        user.token = token;
        user.save();

        res.json({auth:true, token:token, result:user})
      }
        
      else {
        res.json({auth:false, message:"Wrong password"})
      }
    })
  })
  .catch(() => res.json({auth:false, message:"Error authenticating user"}))
});


module.exports = router;
const express = require('express')
const router = express.Router()
const Users = require('./auth-model')
const db = require('../database/dbConfig')
const bcrypt = require('bcrypt')
const restricted = require('./authenticate-middleware');




// REGISTER 
router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash;
  Users.add(user)
  .then(saved => {
      res.status(201).json(saved);
  }) .catch(error => {
      res.status(500).json(error);
  });
});



//LOGIN
router.post('/login', validate, (req, res) => {
  const {username, password} = req.headers;

  Users.findBy({username})
    .first()
    .then(user => {
      console.log(user);
      if(user && bcrypt.compareSync(password, user.password)) {
         req.session.user = user; 
         res.status(200).json({message: `Welcome ${req.session.user.username}!`})
      } else {
        
          res.status(400).json({message: "Invalid Credentials"});
      }    
    }) .catch(error => {
      console.log(error);
        res.status(500).json(error)
    });
});


// USERS

router.get("/users", restricted, (req, res) => {
  Users.find()
  .then(users => {
      res.json(users);
  }) .catch(error => res.send(error));
});




//VALIDATE

function validate(req, res, next) {
  const {username, password} = req.headers;

  if (username && password) {
    
    Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        
        next();
      } else {
        res.status(401).json({message: "Invalid credentials"});
      }
    })
      .catch(err => {
      res.status(500).json({message:"unexpected error"});
    });
  
  } else {
    res.status(400).json({message:"no credentials provided"});
  }
}




// TESTING




module.exports = router;

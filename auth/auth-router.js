const express = require('express')
const router = express.Router()
const Users = require('./auth-model')
const db = require('../database/dbConfig')
const bcrypt = require('bcrypt')
const restricted = require('./authenticate-middleware')
const jwt = require('jsonwebtoken')
const authenticate = require('../auth/authenticate-middleware');




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
        const token = generateToken(user);
         //req.session.user = user; 
         res.status(200).json({message: `Welcome ${user.username}!`, token})
      } else {
        
          res.status(400).json({message: "Invalid Credentials"});
      }    
    }) .catch(error => {
      console.log(error);
        res.status(500).json(error)
    });
});


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const secret = process.env.SECRET || "$$$$$$$$"
const options = {
  expiresIn: '1h'
}
return jwt.sign(payload, secret, options);
};


// USERS

router.get("/users", restricted, authenticate, (req, res) => {
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

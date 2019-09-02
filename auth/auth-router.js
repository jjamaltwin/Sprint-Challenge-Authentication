const express = require('express')
const router = express.Router()
const Users = require('./auth-model')
const bcrypt = require('bcrypt');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash;
  Users.add(user)
  .then(saved => {
      res.status(201).json(saved);
  }) .catch(error => {
      res.status(500).json(error);
  });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;

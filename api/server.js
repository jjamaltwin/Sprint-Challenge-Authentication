const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../auth/auth-router.js')
const jokesRouter = require('../jokes/jokes-router.js')
const server = express()
const session = require('express-session');





server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(
    session({
      name: '$$$$$$', // default is connect.sid
      secret: 'Slow is fast, and fast is slow...',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true, // only set cookies over https. Server will not send back a cookie over http.
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
    })
  );

server.use('/api/auth', authRouter)
server.use('/api/jokes', authenticate, jokesRouter);

//TESTING

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });

server.post('/register', (req, res) => {
    res.status(201).json({status: "CREATED"});
});

server.post('/login', (req, res) => {
    res.status(200).json({status: "OK"});
});


module.exports = server;

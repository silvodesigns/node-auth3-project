const express = require('express');

const server = express();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

server.use(express.json());


server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('Its alive');
})


module.exports = server;
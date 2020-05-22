const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.send.SECURE_COOKIE || false, //send cookie over HTTPS only, should be true during production
        httpOnly: true, //true means that clients JS cannot access the cookie
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: 'Name',
    secret: process.env.COOKIE_SECRET || 'secretcookie'
}

server.use(session(sessionConfig))
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;



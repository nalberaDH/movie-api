const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./routes/moviesRouter');
const userRouter = require('./routes/userRouter');
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));

server.use(moviesRouter);
server.use(userRouter);


server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status(status).send(message);
});

module.exports = server;
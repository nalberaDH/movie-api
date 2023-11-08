const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(morgan('dev'));



server.get('/', (req,res) => {
    res.send("<h5>I'm here</h5>");
});

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status(status).send(message);
});

module.exports = server;
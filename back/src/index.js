const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routers/router');

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use('/', router);


server.listen(3001, () => {
    console.log("server no ar")
})
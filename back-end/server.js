const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressWs = require('express-ws');
const logger = require("./logger/loggerConfig")

const Authentication = require("./src/Routes/Authentication");
const commentsRouter = require('./src/Routes/comments');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const corsOptions = {
    exposedHeaders: 'auth-header',
};
app.use(cors(corsOptions));

app.use(express.json());
const wsInstance = expressWs(app);

mongoose.connect("mongodb+srv://Sharanya:Sharna&ashu798@fakeorfact.9ynja.mongodb.net/Major_project?retryWrites=true&w=majority",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>{
    logger.info("Database is connected Successfully !!" );
    console.log("Database is connected");
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, content-Type, Accept, Authorization"
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    next();
    })
app.use("/",Authentication);
app.use('/api/comments',commentsRouter);

app.ws('/api/comment', (ws, req) => {

    ws.on('message', function incoming(message) {
      ws.broadcast(message);
    });

    ws.broadcast = function broadcast(data) {
      wsInstance.getWss().clients.forEach(function each(client) {
      client.send(data);
      });
    };
})

app.listen(3000,()=>{
    console.log('Server is running on port :3000');
    logger.info("Server is connected, and running on port 3000 Successfully !!" );
})
module.exports = app;
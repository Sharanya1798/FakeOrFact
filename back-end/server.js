const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressWs = require('express-ws');

const Authentication = require("./src/Routes/Authentication");
const commentsRouter = require('./src/Routes/comments');
const cacheRouter = require('./src/Routes/cache');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 3000;

const corsOptions = {
    exposedHeaders: 'auth-header',
};
app.use(cors(corsOptions));

app.use(express.json());
const wsInstance = expressWs(app);

const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://Sharanya:Sharna&ashu798@fakeorfact.9ynja.mongodb.net/Major_project?retryWrites=true&w=majority",{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
.then(()=>{
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
app.use('/api/cache', cacheRouter);

app.ws('/api/comment', (ws, req) => {

    ws.on('message', function incoming(message) {
      console.log(message) ;
      ws.broadcast(message);
    });

    ws.broadcast = function broadcast(data) {
      wsInstance.getWss().clients.forEach(function each(client) {
      client.send(data);
      });
    };
})

app.listen(3000,()=>{
    console.log(`Server is running on port :${port}`);
})
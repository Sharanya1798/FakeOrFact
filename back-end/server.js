require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Authentication = require("./src/Routes/Authentication");
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 3000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
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

app.listen(3000,()=>{
    console.log(`Server is running on port :${port}`);
})
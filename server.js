const appJs = require(__dirname+"/app.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, res){
    const userName = req.body.username;
    const password = req.body.password;
    appJs().insertDocuments(userName, password);
    //app.insertDocuments(userName, password);
    //insertDocuments


    res.send("success");
});

app.listen(3001, function (){
    console.log("Server started on port 3000");
})
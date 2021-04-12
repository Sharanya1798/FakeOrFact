const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, res){
    var userName = req.body.username;
    var password = req.body.password;

    console.log(userName+"  "+password);

    res.send("success");
});

app.listen(3000, function (){
    console.log("Server started on port 3000");
})
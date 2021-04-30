let User = require("../models/signupSchema");
let Queries = require("../models/querySchema");
var jwt = require("jsonwebtoken");
//var jwt_decode = require("jwt_decode")
const bcrypt = require("bcrypt");
const Validator = require("validator");
const isEmpty = require("is-empty");
let config = require("../../config");


exports.singin = (req,res) =>{
    const {userName,password} = req.body;
    if(isEmpty(userName) || isEmpty(password))
        res.status(400).send({msg : "Required fields are empty !!"})
    else {

    User.findOne({userName},(err,foundUser)=>{
        if(foundUser){
            bcrypt.compare(password,foundUser.password,(err,result)=>{
                if (result){
                    const payload = {
                        id: foundUser._id,
                        name: foundUser.userName
                      };
                      var token = jwt.sign(
                        {userName : foundUser.userName},
                        config.secret,
                        {
                          expiresIn: 31556926 // 1 year in seconds
                        }
                    );
                    res.json({new_token: token});
                    //res.status(200).send({foundUser, auth: true, token: token});
                }else if(err){
                    console.log(err);
                    res.status(400).send({msg : "error found"})
                }else{
                    res.status(400).send({msg: "invalid password", auth: false, token: null});
                }
            })
        } else {
            res.status(400).send({msg: "Username not found"});
        }
    })}
}

exports.signup = (req,res) =>{
    const userName= req.body.userName;
    const email= req.body.email;
    const password= req.body.password;
    const password2 = req.body.password2;
    if(isEmpty(userName) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
        res.status(400).send({msg : "Required fields are empty !!"})
    } else if(!Validator.isEmail(email)) {
        res.status(400).send({msg : "Email is invalid"})
    } else if(!Validator.isLength(password, { min: 6, max: 30 })){
        res.status(400).send({msg : "Password must be atleast 6 characters"})
    } else if(!Validator.equals(password, password2)) {
        res.status(400).send({msg : "Both Passwords must match"})
    } else {
        User.findOne({ userName: userName }).then(user => {
            if (user) {
                return res.status(400).send({ msg: "UserName already exists, try other" });
            } else {
                bcrypt.hash(password,10,(err,hash)=>{
                    const newSignup = new User({
                        userName,email,password:hash
                    });
                    newSignup.save().then(user => res.json(user)).catch(err => res.send("Some error occured"));
                });
            }
        });
    }
}

exports.raiseQuery = (req, res) => {
    const email= req.body.email;
    const queryName= req.body.queryName;
    const queryDec = req.body.queryDescription;
    const userName = req.body.userName;
    if(isEmpty(email) || isEmpty(queryName) || isEmpty(queryDec)) {
        res.status(400).send({msg : "Required fields are empty !!"})
    } else if(!Validator.isEmail(email)) {
        res.status(400).send({msg : "Email is invalid"})
    } else {
        const newQuery = new Queries({
            userName,email,queryName,queryDec
        });
        newQuery.save().then(user => res.json(user)).catch(err => res.send("Some error occured"));
    }
}

exports.allQueries = (req, res) => {
    Queries.find().then(list => {
        console.log("came here")
        res.json({queries: list});
    });
    
}
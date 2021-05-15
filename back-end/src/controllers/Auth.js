let User = require("../models/signupSchema");
let Queries = require("../models/querySchema");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Validator = require("validator");
const isEmpty = require("is-empty");
let config = require("../../config");
const logger = require("../../logger/loggerConfig");


exports.singin = (req,res) =>{

    const {userName,password} = req.body;
    if(isEmpty(userName) || isEmpty(password))
        res.status(400).send({msg : "Required fields are empty !!"})
    else {
    User.findOne({userName},(err,foundUser)=>{
        if(foundUser){

            bcrypt.compare(password,foundUser.password,(err,result)=>{
                if (result){

                      var token = jwt.sign(
                        {id : foundUser._id, role : foundUser.role},
                        config.secret,
                        {
                          expiresIn: 31556926 // 1 year in seconds
                        }
                    );
                    logger.info("message from winston : signed in successfully for user -->",{ message: foundUser.userName } );
                    res.header('auth-header',token);
                    res.json({new_token: token});
                }else if(err){
                    console.log(err);
                    logger.error("some error found");
                    res.status(400).send({msg : "error found"})
                }else{
                    logger.error("Invalid password for--> ", {message: foundUser.userName});
                    res.status(400).send({msg: "invalid password", auth: false, token: null});
                }
            })
        } else {
            logger.error("message from winston : Username not found for", {message: userName});
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
        logger.error("message from winston : Required fields are empty" );
        res.status(400).send({msg : "Required fields are empty !!"})
    } else if(!Validator.isEmail(email)) {
        logger.error("message from winston : Email is Invalid" );
        res.status(400).send({msg : "Email is invalid"})
    } else if(!Validator.isLength(password, { min: 6, max: 30 })){
        logger.error("message from winston : Password must be atleast 6 characters" );
        res.status(400).send({msg : "Password must be atleast 6 characters"})
    } else if(!Validator.equals(password, password2)) {
        logger.error("message from winston : Both Passwords must match" );
        res.status(400).send({msg : "Both Passwords must match"})
    } else {
        User.findOne({ userName: userName }).then(user => {
            console.log("came here")
            if (user) {
                logger.error("message from winston : UserName already exists, try other" );
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
    const user_ID = req.body.user_ID;
    if(isEmpty(email) || isEmpty(queryName) || isEmpty(queryDec)) {
        logger.error("message from winston : Required fields are empty !!" );
        res.status(400).send({msg : "Required fields are empty !!"})
    } else if(!Validator.isEmail(email)) {
        logger.error("message from winston : Email is invalid !!" );
        res.status(400).send({msg : "Email is invalid"})
    } else {
        const newQuery = new Queries({
            user_ID,email,queryName,queryDec
        });
        newQuery.save().then(user => {
            logger.info("message from winston : post submitted successfully !!" );
            res.json(user)
        }).catch(err => {
            logger.error("message from winston : Some error occured" );
            res.send("Some error occured")});
    }
}

exports.allQueries = (req, res) => {
    Queries.find().then(list => {
        logger.info("message from winston : Posts data retrieved successfully!!" );
        res.json({queries: list});
    });   
}

exports.myQueries = (req, res) => {
    const user_ID = req.body.user_ID;
    Queries.find({ "user_ID": user_ID }).then(list => {
        logger.info("message from winston : Individual posts retrieved successfully !!" );
        res.json({queries: list});
    }); 
}

exports.deletePost = (req, res) => {
    const post = req.body.post;
    Queries.findByIdAndDelete({"_id": post._id}).then( docum => {
        logger.info("message from winston : Post deleted Successfully!!" );
        res.status(200).send({msg : "success"})
    });
}
let User = require("../models/signupSchema");
const bcrypt = require("bcrypt");

exports.singin = (req,res) =>{
    const {userName,password} = req.body;
    User.findOne({userName},(err,foundUser)=>{
        if(foundUser){
            bcrypt.compare(password,foundUser.password,(err,result)=>{
                if (result){
                    res.status(200).send(foundUser)
                }else if(err){
                    console.log(err);
                    res.status(400).send({msg : "error found"})
                }else{
                    res.status(400).send({msg: "invalid username / password"});
                }

            })
        } else {
            res.status(400).send({msg: "invalid username / password"});
        }
    })
}



exports.signup = (req,res) =>{
    const userName= req.body.userName;
    const email= req.body.email;
     const password= req.body.password;
     const password2= req.body.password2;
     bcrypt.hash(password,10,(err,hash)=>{
         const newSignup = new User({
            userName,email,password:hash, password2:hash
         });
         newSignup.save(err=>{
             if(err){
                 console.log(err);
                 res.send("There is some error");
             }else{
                 res.send("Data is saved succesfully");
             }
         });
     });
}
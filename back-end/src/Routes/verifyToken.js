const jwt = require('jsonwebtoken');
let config = require("../../config");


module.exports = function (req,res,next){
    //console.log("came into verifyToken " + req);
    const token = req.header('auth-header');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,config.secret);
        //console.log(verified);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}
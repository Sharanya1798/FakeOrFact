const jwt = require('jsonwebtoken');
let config = require("../../config");
const logger = require("../../logger/loggerConfig")

module.exports = function (req,res,next){
    const token = req.header('auth-header');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,config.secret);
        req.user = verified;
        logger.info("message from winston : Token has been verified successfully for ",{ message: verified.id } );
        next();
    }catch(err){
        logger.error("message from winston : Invalid token found " );
        res.status(400).send({msg: 'Invalid token'});
    }
}
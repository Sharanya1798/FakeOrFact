const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
   password:{
       type:String,
       required:true
   },
   role:{
    type:String,
    enum:["admin","user"],
    default:"admin"
   }
});

const User = mongoose.model("User",userSchema);
module.exports = User;



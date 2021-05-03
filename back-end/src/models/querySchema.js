const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const querySchema = new mongoose.Schema({
    user_ID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    queryName:{
        type:String,
        required:true,
    },
    queryDec:{
        type:String,
        required:true,
    }
});

const Queries = mongoose.model("Queries",querySchema);
module.exports = Queries;
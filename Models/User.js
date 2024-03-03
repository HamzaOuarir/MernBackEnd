const { Schema, model } = require("mongoose");
let user = new Schema({
    name: String,
    email:String,
    password: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});

let User = model("User", user)
module.exports = User;
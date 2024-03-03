const { Schema, model } = require("mongoose");


let workExp = new Schema({
    CmpName: String,
    PostName: String,
    period: String,

});

// Create a model using the project schema
let WorkExp = model("WorkExp", workExp);

module.exports = WorkExp;
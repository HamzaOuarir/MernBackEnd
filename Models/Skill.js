const { Schema, model } = require("mongoose");


// Define the schema for the project
let skill = new Schema({
    name: String,
    image: String,
});

// Create a model using the project schema
let Skill = model("Skill", skill);

module.exports = Skill;
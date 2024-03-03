const { Schema, model } = require("mongoose");

// Define the schema for the tool
let toolSchema = new Schema({
    name: String,
    image: String
});

// Define the schema for the project
let projectSchema = new Schema({
    name: String,
    Description: String,
    image: String,
    link: String,
    tools: [toolSchema] // Array of objects representing tools used in the project
});

// Create a model using the project schema
let Project = model("Project", projectSchema);

module.exports = Project;
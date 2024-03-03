const { Schema, model } = require("mongoose");


// Define the schema for the project
let certDep = new Schema({
    name: String,
    title: String,
    image: String,
    date: String
});

// Create a model using the project schema
let CertDep = model("CertDep", certDep);

module.exports = CertDep;
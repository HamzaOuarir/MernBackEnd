const mongoose = require("mongoose");
mongoose
     .connect("mongodb+srv://warirhamza43:tu2q75zF9o81Cx2H@portfolio.pavjwtx.mongodb.net/?retryWrites=true&w=majority&appName=portfolio")
    .then(() => {
            console.log("Connected to MongoDB");
        })
       .catch((err) => {
        console.log(err);
       });
module.exports = mongoose;

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    });

const User = mongoose.model("User", userSchema);
module.exports = User;
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const noteSchema = Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
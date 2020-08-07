const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotepadSchema =  new Schema({
    name: String,
    color: String,
    background: String
});

module.exports = mongoose.model("Notepad", NotepadSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema =  new Schema({
    title: String,
    color: String,
    text: String,
    notepad: String
});

module.exports = mongoose.model('Note', NoteSchema);

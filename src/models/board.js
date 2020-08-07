const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema =  new Schema({
    name: String,
    color: String,
    background: String,
    notepads: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Notepad'
    }]
});

module.exports = mongoose.model("Board", BoardSchema);

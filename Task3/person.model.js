var mongoose = require('mongoose');

var Schema = mongoose.Schema
//БД
var PersonSchema = new Schema({
    name: {
        type: String,
        requiered: true
    },
    message: {
        type: String,
        max: 50
    }
})
mongoose.model('persons', PersonSchema);

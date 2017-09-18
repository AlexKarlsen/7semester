var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    name: String,
    description: String,
    sets: String,
    reps: String
});

var Exercise = mongoose.Model('Exercise', exerciseSchema);

module.exports = Exercise;
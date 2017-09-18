var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const exerciseModel = require('exercisesModel');


var workoutsSchema = new Schema({
    name: String,
    exercise : exerciseModel.Exercise
});

var Workout = mongoose.Model('Workout', workoutsSchema);

module.exports = Workout;
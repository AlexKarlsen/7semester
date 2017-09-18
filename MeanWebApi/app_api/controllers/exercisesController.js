var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var database = "heroku_1qwhzr0g";
var url = "mongodb://heroku_1qwhzr0g:m5ckh9rbj79e3vda4gidgvb2qi@ds125774.mlab.com:25774/heroku_1qwhzr0g";
const model = require('exercisesModel');

module.exports.exercisesList = function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { _id: new ObjectID(req.query._workout) };
        db.collection("workouts").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
    });
    res.send(result); 
};
module.exports.exercisesCreate = function(req, res){
    //var workout = {$push: {exercises:{ exercise : _exercise, description : _description, sets : _sets, reps : _reps }}};
    var workout = new model.Exercise({
        name : req.name,
        description : req.description,
        sets : req.sets,
        reps : req.reps
    });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = {_id:new ObjectID(req.workoutId)};
        db.collection("workouts").updateOne(
            query, workout, {upsert: true}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();   
        });
    });
    // Return status code Created at 201
};

module.exports.exercisesReadOne = function(req, res){

};

module.exports.exercisesUpdateOne = function(req, res){

};

module.exports.exercisesDeleteOne = function(req, res){

};
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var database = "heroku_1qwhzr0g";
var url = "mongodb://heroku_1qwhzr0g:m5ckh9rbj79e3vda4gidgvb2qi@ds125774.mlab.com:25774/heroku_1qwhzr0g";
var model = require('workoutsModel');

module.exports.workoutsList = function (req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("workouts").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    }); 
    return res.send(result);
};

module.exports.workoutsCreate = function (req, res){
    var workout = new model.Workout({
        name : req.name,
        exercises : []
    });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("workouts").insertOne(workout, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

module.exports.workoutsReadOne = function(req, res){

};

module.exports.workoutsUpdateOne = function(req, res){

};

module.exports.workoutsDeleteOne = function(req, res){

};
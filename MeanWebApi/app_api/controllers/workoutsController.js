var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var database = "heroku_1qwhzr0g";
var url = "mongodb://heroku_1qwhzr0g:m5ckh9rbj79e3vda4gidgvb2qi@ds125774.mlab.com:25774/heroku_1qwhzr0g";

module.exports.workoutsList = function (req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("workouts").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.header("Access-Conrtol-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return res.send(result);
        });
    }); 
};

module.exports.workoutsCreate = function (req, res){
    var workout = {
        name : req.body.name,
        exercises : []
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("workouts").insertOne(workout, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.status(201).json({
        message : "Workout Created"
    })
};

module.exports.workoutsReadOne = function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { _id: new ObjectID(req.params.id) };
        db.collection("workouts").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return res.send(result);
        });
    }); 
};

module.exports.workoutsUpdateOne = function(req, res){
    var workout = {$push: {exercises:{ exerciseName : req.body.name, description : req.body.description, sets : req.body.sets, reps : req.body.reps }}};
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = {_id:new ObjectID(req.params.id)};
        db.collection("workouts").updateOne(
            query, workout, {upsert: true}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();   
        });
    });
    res.status(201).json({
        message : "Exercise Created"
    })
};

module.exports.workoutsDeleteOne = function(req, res){

};
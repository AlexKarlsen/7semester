var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var database = "heroku_1qwhzr0g";
var url = "mongodb://heroku_1qwhzr0g:m5ckh9rbj79e3vda4gidgvb2qi@ds125774.mlab.com:25774/heroku_1qwhzr0g";

function createExercise(_exercise, _description, _sets, _reps, _workout){
    var workout = {$push: {exercises:{ exercise : _exercise, description : _description, sets : _sets, reps : _reps }}};
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = {_id:new ObjectID(_workout)};
        db.collection("workouts").updateOne(
            query, workout, {upsert: true}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();   
        });
    });
};

function createWorkout(_name){
    var workout = {name : _name, exercises : []};
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("workouts").insertOne(workout, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

// Callback async: cannot call function - look at promises.
/*function findAllExercises() {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("exercises").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          return result;
        });
    });
}; */

const workoutsView = module.exports.workoutsView = function(req,res)
{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("workouts").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render('workoutsView', { title: 'Fitness App', workouts : result });
        });
    }); 
};

const exercisesView = module.exports.exercisesView = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { _id: new ObjectID(req.query._workout) };
        db.collection("workouts").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render('exercisesView', { title: result[0].name, exercises : result[0].exercises, _workout : req.query._workout });
        });
    });      
};

module.exports.workoutCreateView = function(req, res) {
    res.render('workoutCreateView', { title: 'Create a new Workout Program' });
};

module.exports.exerciseCreateView = function(req, res) {
    res.render('exerciseCreateView', { title: 'Create a new Exercise', _workout : req.query._workout});
};

module.exports.workoutCreatePost = function(req, res){
    createWorkout(req.body._name);
    workoutsView(req,res);
};

module.exports.exerciseCreatePost = function(req, res){
    createExercise(req.body._exercise,req.body._description,req.body._sets,req.body._reps,req.body._workout);
    req.query._workout = req.body._workout;
    //exercisesView(req,res);
    res.redirect('exercisesView?_workout='+req.body._workout);
};

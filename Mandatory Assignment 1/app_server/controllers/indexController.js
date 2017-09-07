var MongoClient = require('mongodb').MongoClient;
var database = "heroku_1qwhzr0g";
var url = "mongodb://heroku_1qwhzr0g:m5ckh9rbj79e3vda4gidgvb2qi@ds125774.mlab.com:25774/heroku_1qwhzr0g";

// https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp

function createExercise(_exercise, _description, _sets, _reps){
    var exercise = {exercise : _exercise, description : _description, sets : _sets, reps : _reps};
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("exercises").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};


function findAllExercises() {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("exercises").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          return result;
        });
    });
}; 

/* Get Homepage */
module.exports.index = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("exercises").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render('index', { title: 'Fitness App', exercises : result });
        });
    });    
    
};

module.exports.create = function(req, res) {
    res.render('create', { title: 'Create a new Exercise' });
};


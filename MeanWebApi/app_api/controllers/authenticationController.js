var passport = require('passport');
var mongoose = require('mongoose');
var url = "mongodb://heroku_1qwhzr0g:m5ckh9rbj79e3vda4gidgvb2qi@ds125774.mlab.com:25774/heroku_1qwhzr0g";
mongoose.connect(url, { useMongoClient : true });
mongoose.Promise = global.Promise;

var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    console.log('name: ' + req.body.name + ' email: ' + req.body.email + ' password: ' + req.body.password); 
    if(!req.body.name || !req.body.email || !req.body.password) 
    {
        sendJSONresponse(res, 400, {
            "message" : "All fields are required"
        });
    return;
    }
    const user = new User();
    user.name = req.body.name; user.email = req.body.email; user.setPassword(req.body.password); user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, {
                "message" : err
            });
        } 
        else {
            token = user.generateJwt(); 
            sendJSONresponse(res, 200, {
                    "token" : token
            });
        }
    }); 
};

module.exports.login = function(req, res) {
    console.log('email: ' + req.body.email + ' password: ' + req.body.password); 
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message" : "All fields are required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;
        console.log('User: ' + user);
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }

        if(user){
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
              "token" : token
            });
        }
        else {
            sendJSONresponse(res, 401, info);
        }
    })
    (req, res);
};
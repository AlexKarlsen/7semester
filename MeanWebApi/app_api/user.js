const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var crypto = require('crypto');
//const SALT_VALUE = 'my_salt';

const userSchema = new mongoose.Schema({
    email: {
        type: String, unique: true, required: true
    }, 
    name: {
        type: String,
        required: true },
    hash: String,
    salt: String
  });

userSchema.methods.setPassword = function(password){ this.salt = SALT_VALUE;
    this.salt = crypto.randomBytes(24).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) { 
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha512').toString('hex'); 
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    },  process.env.JWT_SECRET);  // DO NOT KEEP YOUR SECRET IN THE CODE!
};

var User = mongoose.model('User', userSchema);

module.exports = User;
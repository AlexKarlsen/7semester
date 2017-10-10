const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router
    .route('/register')
    .post(authenticationController.register);

router
    .route('/login')
    .post(authenticationController.login);

module.exports = router;
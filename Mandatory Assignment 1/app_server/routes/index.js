var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexController');





//var indexController = function(req, res) {
//  res.render('index', {title: 'express'});
//};

/* GET home page. */
router.get('/', controller.index);

/* GET create program */
router.get('/create', controller.create);

module.exports = router;

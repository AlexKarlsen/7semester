var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexController');

router.get('/', controller.workoutsView);

router.get('/exercisesView/', controller.exercisesView);

router.get('/workoutCreateView', controller.workoutCreateView);

router.get('/exerciseCreateView', controller.exerciseCreateView);

router.post('/exerciseCreatePost', controller.exerciseCreatePost);

router.post('/workoutCreatePost', controller.workoutCreatePost);

module.exports = router;

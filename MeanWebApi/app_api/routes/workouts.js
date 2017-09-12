const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');

// Collection Uri Routing
router
    .route('/workouts')
    .get(workoutsController.workoutsList)
    .post(workoutsController.workoutsCreate);

// Element Uri routing
router
    .route('workouts:id')
    .get(workoutsController.workoutsReadOne)
    .put(workoutsController.workoutsUpdateOne)
    .delete(workoutsController.workoutsDeleteOne);


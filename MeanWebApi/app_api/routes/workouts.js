const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController');

// Collection Uri Routing
router
    .route('/workouts')
    .get(workoutsController.workoutsList)
    .post(workoutsController.workoutsCreate);

// Element Uri routing
router
    .route('/workouts/:id')
    .get(workoutsController.workoutsReadOne)
    .post(workoutsController.workoutsUpdateOne)
    .delete(workoutsController.workoutsDeleteOne);

module.exports = router;
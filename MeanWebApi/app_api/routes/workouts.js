const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController');
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// Collection Uri Routing
router
    .route('/workouts')
    .get(workoutsController.workoutsList, auth)
    .post(workoutsController.workoutsCreate, auth);

// Element Uri routing
router
    .route('/workouts/:id')
    .get(workoutsController.workoutsReadOne, auth)
    .post(workoutsController.workoutsUpdateOne, auth)
    .delete(workoutsController.workoutsDeleteOne, auth);

module.exports = router;
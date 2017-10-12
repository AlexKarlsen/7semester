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
    .get(workoutsController.workoutsList)
    .post(auth, workoutsController.workoutsCreate);

// Element Uri routing
router
    .route('/workouts/:id')
    .get(workoutsController.workoutsReadOne)
    .post(auth, workoutsController.workoutsUpdateOne)
    .delete(auth, workoutsController.workoutsDeleteOne);

module.exports = router;
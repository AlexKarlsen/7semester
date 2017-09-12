const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');

// Collection Uri Routing
router
    .route('/exercises')
    .get(exercisesController.exercisesList)
    .post(exercisesController.exercisesCreate);

// Element Uri routing
router
    .route('exercises:id')
    .get(exercisesController.exercisesReadOne)
    .put(exercisesController.exercisesUpdateOne)
    .delete(exercisesController.exercisesDeleteOne);
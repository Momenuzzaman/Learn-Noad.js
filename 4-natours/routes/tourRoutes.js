const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
const { getAllTour, postTour, getTour, updateTour, deleteTour } = tourController;

router
    .route('/')
    .get(getAllTour)
    .post(postTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;
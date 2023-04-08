const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController.js');
const { getAllUser } = userController;


router
    .route('/')
    .get(getAllUser)
//     .post(postUser)
// router
//     .route('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);


module.exports = router;
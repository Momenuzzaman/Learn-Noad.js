const express = require('express');

const router = express.Router();

const getAllUser = (req, res) => {
    res.status(500).json({
        status: "Not Found",
        message: "User not found",
    })
};

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
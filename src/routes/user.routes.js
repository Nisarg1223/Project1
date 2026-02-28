const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller.js');
const identifyUser = require('../middlewares/auth.middleware.js');

// /api/users/follow/:userid
userRouter.post('/follow/:username', identifyUser, userController.followUserController)

// /api/users/unfollow/:userid
userRouter.post('/unfollow/:username', identifyUser, userController.unfollowUserController)
module.exports = userRouter;
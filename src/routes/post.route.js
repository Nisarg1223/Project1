const express = require('express');
const Router = express.Router();
const postController = require('../controllers/post.controller.js');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
//post:- /api/posts

Router.post('/',upload.single('image'), postController.createPostController);

module.exports = Router;
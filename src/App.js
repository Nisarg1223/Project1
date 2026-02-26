const express = require('express');
const cookieParser = require('cookie-parser');
const Router = require('./routes/auth.route.js');
const postRouter = require('./routes/post.route.js');
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',Router);
app.use('/api/posts',postRouter);
module.exports = app;
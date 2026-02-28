const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

//require routes
const AuthRouter = require('./routes/auth.route.js');
const postRouter = require('./routes/post.route.js');
const userRouter = require('./routes/user.routes.js');
app.use(express.json())
app.use(cookieParser())



//using routes
app.use('/api/auth',AuthRouter);
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);
module.exports = app;
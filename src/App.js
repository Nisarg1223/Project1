const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
//require routes
const AuthRouter = require('./routes/auth.route.js');
const postRouter = require('./routes/post.route.js');
const userRouter = require('./routes/user.routes.js');
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));


//using routes
app.use('/api/auth',AuthRouter);
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);
module.exports = app;
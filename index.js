const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = express();

// DB CONNECTION
mongoose.connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => console.log('the connection done with database'));

// MIDDLEWARE TO USE req.body
app.use(express.json());

// The routes
// example : app.use('/users', userRouter);

app.listen((3000), () => {
    console.log("the server running on port 3000");
})
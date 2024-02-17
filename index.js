const URI = require('./dbCreds');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const GlobalErrorHandler = require('./_helpers/GlobalErrorHanlder')

const categoryRouter = require('./Routes/categoryRouter')
const authorRouter = require('./Routes/authorRouter')
const bookRouter = require('./Routes/bookRouter')

// DB CONNECTION
mongoose.connect(URI, {
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })  //.then(() => console.log('the connection done with database'));
  
// MIDDLEWARE TO USE req.body
app.use(express.json());


// The routes
app.use('/categories', categoryRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.use(GlobalErrorHandler)

app.listen((3000), () => {
    console.log("the server running on port 3000");
})
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routers');

dotenv.config({ path: './config.env' });
const app = express();

const PORT = process.env.PORT || 3000;

// DB CONNECTION
mongoose
  .connect(process.env.DB_REMOTE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('the connection done with database'));

// MIDDLEWARE TO USE req.body
app.use(express.json());
app.use(helmet());

// ROUTES
app.use(routes);

app.listen(PORT, () => {
  console.log(`the server running on port ${PORT}`);
});

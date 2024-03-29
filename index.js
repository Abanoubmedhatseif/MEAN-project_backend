/* eslint-disable import/no-unresolved */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routers');

dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// DB CONNECTION
mongoose.connect(process.env.DB_URL);

app.set('view engine', 'ejs');

// MIDDLEWARE TO USE req.body
app.use(express.json());
app.use(helmet());

// Cross-origin resource sharing
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// ROUTES
app.use(routes);

// Middleware | Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ errorMessage: err.message });
});

// For any non-defined routes.
app.use('*', (req, res) => {
  res.status(404).json({ Error: 'No route defined for this :(' });
});

app.listen(PORT, () => {
  console.log(`the server running on port ${PORT}`);
});

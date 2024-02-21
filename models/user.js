const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
  },
  shelve: {
    type: String,
    default: 'want to read',
    enum: ['read', 'reading', 'want to read'],
  },
  rate: {
    type: Number,
    default: 0,
    min: 1,
    max: 5,
  },
  userReview: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  books: [bookSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

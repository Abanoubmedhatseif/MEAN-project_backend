const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
  },
  shelve: {
    type: String,
    enum: ['read', 'reading', 'want to read'],
  },
  rate: {
    type: Number,
    default: 0,
    min: 1,
    max: 5,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'you must add your firstName'],
  },
  lastName: {
    type: String,
    required: [true, 'you must add your lastName'],
  },
  userName: {
    type: String,
    required: [true, 'you must add your userName'],
  },
  password: {
    type: String,
    required: [true, 'you must add your password'],
  },
  books: [bookSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

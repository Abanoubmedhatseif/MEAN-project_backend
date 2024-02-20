const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },

  rate: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 5,
    default: 0,
  },
});

const BookSchema = new mongoose.Schema({
  photo: String,

  bookName: {
    type: String,
    required: true,
  },

  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Category',
  },

  authorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Authors',
  },

  rating: [RatingSchema],
});

const Book = mongoose.model('BookModel', BookSchema, 'books');

module.exports = Book;

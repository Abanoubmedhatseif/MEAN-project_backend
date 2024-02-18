const mongoose = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const RatingSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    default: "",
    // ref: 'User'
    // unique: true
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
    type: Number,
    required: true,
    ref: "Category",
  },

  authorId: {
    type: Number,
    required: true,
    ref: "Author",
  },

  rating: [RatingSchema],
});

autoIncrement.initialize(mongoose.connection);

BookSchema.plugin(autoIncrement.plugin, {
  model: "Book",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

const Book = mongoose.model("BookModel", BookSchema, "books");

module.exports = Book;

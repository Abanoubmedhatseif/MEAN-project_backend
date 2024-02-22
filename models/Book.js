const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  photo: String,

  bookName: {
    type: String,
    required: true,
    unique: true,
  },

  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Category",
  },

  authorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Authors",
  },
});

const Book = mongoose.model("BookModel", BookSchema, "books");

module.exports = Book;

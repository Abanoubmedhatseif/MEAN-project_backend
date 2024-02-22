const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  photo: String,
  bookName: {
    type: String,
    required: true,
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
  books: [
    {
      book: {
        type: bookSchema,
      },

      rate: {
        type: Number,
        default: 0,
        min: 1,
        max: 5,
      },
      review: {
        type: String,
      },
      shelve: {
        type: String,
        default: "--N/A--",
        enum: ["read", "reading", "want to read"],
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

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
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  userName: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  books: [
    {
      book: {
        type: bookSchema,
        unique: true,
      },

      rate: {
        type: Number,
        default: 0,
        max: 5,
      },
      review: {
        type: String,
        default: "N/A"
      },
      shelve: {
        type: String,
        default: "want to read",
        enum: ["read", "reading", "want to read"],
      },
    },
  ],
},
{
  toJSON: {
    transform: (doc, ret) => {
      ret.password = undefined;
      return ret;
    },
  },
}
);


const User = mongoose.model("User", userSchema);

module.exports = User;

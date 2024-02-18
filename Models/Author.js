const mongoose = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const AuthorSchema = new mongoose.Schema({
  photo: String,

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  date_of_birth: {
    type: Date,
  },
});

autoIncrement.initialize(mongoose.connection);

AuthorSchema.plugin(autoIncrement.plugin, {
  model: "Author",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

const Author = mongoose.model("AuthorModel", AuthorSchema, "authors");

module.exports = Author;

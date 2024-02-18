const Author = require("../models/author");

const getAllAuthors = async () => Author.find({});

const createAuthor = async (data) => Author.create(data);

module.exports = {
  getAllAuthors,
  createAuthor,
};

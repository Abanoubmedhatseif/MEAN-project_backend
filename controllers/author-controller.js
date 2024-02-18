const Author = require('../models/author');

const getAllAuthors = async () => await Author.find({});

const createAuthor = async (data) => await Author.create(data);

module.exports = {
  getAllAuthors,
  createAuthor,
};
  
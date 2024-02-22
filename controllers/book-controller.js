const Book = require("../Models/book");

const getAllBooks = async () => Book.find({});

const getOneBook = async (id) => Book.find({ _id: id });

const createBook = async (data) => Book.create(data);

const updateBook = async (idAndData) => {
  const { id, data } = idAndData;
  const book = await Book.findOneAndUpdate({ _id: id }, data, { new: true });
  return book;
};

const deleteBook = async (id) => {
  const deletedBook = await Book.findByIdAndDelete(id);
  return deletedBook;
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};

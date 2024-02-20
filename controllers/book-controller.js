const Book = require('../models/Book');

const getAllBooks = async () => Book.find({});

const getOneBook = async (id) => Book.find({ _id: id });

const createBook = async (data) => Book.create(data);

const updateBook = async (idAndData) => {
  const { id, data } = idAndData;
  await Book.findOneAndUpdate(
    { _id: id },
    data,
    { new: true },
    (error, doc) => (err) => (err ? error : doc),
  );
};

const updateBookRates = async (idAndData) => {
  const { id, data } = idAndData;
  await Book.findById(id)
    .then((book) => {
      if (!book) return null;
      const targetBookRatings = book.rating;
      targetBookRatings.push(data);
      return book.save();
    })
    .catch((err) => err);
};

const deleteBook = async (id) => {
  await Book.findByIdAndDelete(id);
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  updateBookRates,
  deleteBook,
};

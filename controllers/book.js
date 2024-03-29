const User = require('../models/user');
const Book = require('../models/Book');

// for USER -side routes
const getAllBooks = async (queryname) => {
  let books;
  if (queryname) {
    books = await Book.find({ bookName: { $regex: queryname, $options: 'i' } });
  } else {
    books = await Book.find();
  }
  return books;
};
// .select("-categoryId")
// .populate({
//   path: "authorId",
//   select: "firstName",
// })
// .skip(page * booksPerPage)
// .limit(booksPerPage);

// for USER -side routes
const getOneBook = async (id) => {
  const users = await User.find({});
  const reviews = [];
  const rates = [];

  // TODO rememmber to add dates in every review.
  users.filter((user) => user.books.filter((book) => {
    if (book.bookId == id) {
      reviews.push({ user: user.firstName, reviews: book.reviews });
      rates.push(book.rate);
    }
  }));

  const sum = rates.reduce((acc, rating) => acc + rating, 0);
  const averageRating = sum / rates.length;

  const bookInfo = await Book.findOne({ _id: id })
    .populate({
      path: 'authorId',
      select: 'firstName',
    })
    .populate({
      path: 'categoryId',
      select: 'categoryName',
    });

  return { bookInfo, averageRating, reviews };
};
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

const getAverageRating = async (bookId) => {
  try {
    const averageRating = await User.aggregate([
      { $match: { 'books.bookId': bookId } },
      { $unwind: '$books' },
      { $match: { 'books.bookId': bookId } },
      {
        $group: {
          _id: '$books.bookId',
          averageRating: { $avg: '$books.rate' },
        },
      },
    ]);
    console.log(averageRating);

    if (averageRating.length > 0) {
      return averageRating[0].averageRating;
    }
    return null;
  } catch (err) {

  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
  getAverageRating,
};

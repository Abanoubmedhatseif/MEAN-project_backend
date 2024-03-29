const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Book = require("../models/Book");

const { error } = require("console");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users)
}

// for USER -side routes
exports.Register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { firstName, lastName, userName, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    if (!(req.body.retypePassword === req.body.password))
      throw new Error("Password must be confirmed and matched");

    const userData = {
      firstName,
      lastName,
      userName,
      password: hashedpassword,
    };
    const newUser = await User.create(userData);

    res.status(201).json({
      successMessage: "the user created successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

// for USER -side routes
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) throw new Error("Username or password is incorrect!");
    const matched = await bcrypt.compare(req.body.password, user.password);

    if (!matched) throw new Error("Username or password is incorrect!");
    else {
      const payload = {
        _id: user._id,
        role:'user'
      };
      jwt.sign(
        payload,
        "asbfdngdfedcfsa",
        { expiresIn: "7h" },
        (err, token) => {
          err
            ? res.status(500).json({ message: "error of jwt" })
            : res.status(200).json({ user: user, token: token });
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteAllBooks = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.body._id);
    user.books = [];
    user.save();
    res.status(200).json("deleted all books for this user")
  } catch (error) {
    next(error);
  }
}

// for USER -side routes
exports.addBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const newBook = user.books.find(
      (book) => book.bookId == req.params.id ?? book.book
    );
    if (newBook) throw new Error("Already added book!, choose another!");
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error("Unknown book!");

    user.books.push({
      bookId: book._id,
      rate: 0,
    });
    user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUserOneBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const targetBook = user.books.find(
      (book) => book.book._id == req.params.id ?? book.book
    );
    res.status(200).json(targetBook);
  } catch (error) {
    next(error);
  }
};

async function getAverageRatingsOfBook(id) {
  const users = await User.find({});
  let reviews = [];
  let rates = [];

  // TODO rememmber to add dates in every review.
  users.filter( (user)=> {
    return user.books.filter((book) => {
      if (book.bookId == id) {
        reviews.push({user: user.firstName, reviews: book.reviews})
        rates.push(book.rate)
      }
    })
  });
  
  const sum = rates.reduce((acc, rating) => acc + rating, 0);
  return sum / rates.length;
}


exports.getUserBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("books");
    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }
    if (req.query.shelve) {
      user.books = user.books.filter(book => book.shelve === req.query.shelve);
    }
    const numberOfBooks = user.books.length;
    

    if (numberOfBooks === 0) {
      return res.status(200).json({
        successMessage: "There are no books added yet",
      });
    }

    const booksWithDetails = [];

    for (const book of user.books) {
      const bookDetails = await Book.findById(book.bookId);
      if (bookDetails) {
        const bookObject = {
          bookId:book.bookId,
          bookName: bookDetails.bookName,
          shelve: book.shelve,
          rate: book.rate
        };
        booksWithDetails.push(bookObject);
      }
    }

    return res.status(200).json({
      "number of books": numberOfBooks,
      "the books": booksWithDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorMessage: "Error occurred",
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const booksPerPage = 8;

    const books = await Book.find({})
      .sort()
      .skip(page * booksPerPage)
      .limit(booksPerPage);

    const numberOfBooks = books.length;

    if (numberOfBooks === 0) {
      return res.status(200).json({
        successMessage: "there's no book added yet",
      });
    }
    return res.status(200).json({
      "Number of books": numberOfBooks,
      "The books": books,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "error occured",
    });
  }
};

exports.updateBookShelve = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const shelve = req.body.shelve;

    const targetBook = user.books.find(
      (book) => book.bookId == req.params.id ?? book.book
    );
    if (!targetBook) throw new Error("Unknown book!");

    targetBook.shelve = shelve;
    await user.save();

    return res.status(200).json({
      successMessage: "Book shelve updated successfully",
      updatedBook: targetBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBookRate = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const rate = req.body.rate;

    const targetBook = user.books.find(
      (book) => book.bookId == req.params.id ?? book.book
    );
    if (!targetBook) throw new Error("Unknown book!");

    targetBook.rate = rate;
    await user.save();

    return res.status(200).json({
      successMessage: "Book rate updated successfully",
      updatedBook: targetBook,
    });
  } catch (error) {
    next(error);
  }
};





// for USER -side routes
exports.addBookReview = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }

    const bookIndex = user.books.findIndex(
      (book) => book.bookId == req.params.id
    );

    if (bookIndex === -1) {
      return res.status(404).json({
        errorMessage: "Book not found",
      });
    }

    user.books[bookIndex].reviews.push(req.body.review);
    await user.save();

    return res.status(200).json({
      successMessage: "Book review added successfully",
      updatedBook: user.books[bookIndex],
    });
  } catch (error) {
    return res.status(404).json({
      errorMessage: "error occured",
    });
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const Book = require("../Models/book");
const { error } = require("console");
const verifyToken = require("../middleware/verify-token");

exports.Register = async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    if (
      req.body.retypePassword &&
      req.body.retypePassword === req.body.password
    ) {
      const newUser = {
        firstName,
        lastName,
        userName,
        password: hashedpassword,
      };
      const newuser = await User.create(newUser);
      res.status(201).json({
        successMessage: "the user created successfully",
        newuser,
      });
    } else {
      res.status(500).json({
        errorMessage: "Password must be confirmed and matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage:
        "error occured | check your data | username is already taken",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user    = await User.findOne({ userName: req.body.userName });
    if (!user) throw new Error("Username or password is incorrect!")
    const matched = await bcrypt.compare(req.body.password, user.password);
  
  if (!matched) throw new Error("Username or password is incorrect!")
    else {
      const payload = {
          _id: user._id
      };
      jwt.sign(payload, "asbfdngdfedcfsa", { expiresIn: "7h" }, (err, token) => {
        err
          ? res.status(500).json({ message: "error of jwt" })
          : res.status(200).json({ user: user, token: token });
      });
    }
    
  } catch (error) {
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const newBook = user.books.find(book => book.book._id == req.params.id ?? book.book);
    if(!newBook) throw new Error("Already added book!, choose another!")

    const book = await Book.findById(req.params.id);
    user.books.push({
      book: book,
      rate: 0
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
    const targetBook = user.books.find(book => book.book._id == req.params.id ?? book.book);
    res.status(200).json(targetBook);
  } catch (error) {
    next(error);
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("books");
    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }
    const numberOfBooks = user.books.length;
    if (numberOfBooks === 0) {
      return res.status(200).json({
        successMessage: "there's no book added yet",
      });
    }
    return res.status(200).json({
      "number of books": numberOfBooks,
      "the books": user.books,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "error occured",
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



exports.updateBookShelve = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId } = req.body;
    const newShelve = req.body.shelve;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }

    const bookIndex = user.books.findIndex(
      (book) => book.bookId.toString() === bookId
    );
    if (bookIndex === -1) {
      return res.status(404).json({
        errorMessage: "Book not found",
      });
    }

    user.books[bookIndex].shelve = newShelve;
    await user.save();

    return res.status(200).json({
      successMessage: "Book shelve updated successfully",
      updatedBook: user.books[bookIndex],
    });
  } catch (error) {
    return res.status(404).json({
      errorMessage: "error occured",
    });
  }
};

exports.updateBookRate = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId } = req.body;
    const newRate = req.body.rate;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }

    const bookIndex = user.books.findIndex(
      (book) => book.bookId.toString() === bookId
    );
    if (bookIndex === -1) {
      return res.status(404).json({
        errorMessage: "Book not found",
      });
    }

    user.books[bookIndex].rate = newRate;
    await user.save();

    return res.status(200).json({
      successMessage: "Book rate updated successfully",
      updatedBook: user.books[bookIndex],
    });
  } catch (error) {
    return res.status(404).json({
      errorMessage: "error occured",
    });
  }
};

exports.addBookReview = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId } = req.body;
    const newReview = req.body.userReview;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }

    const bookIndex = user.books.findIndex(
      (book) => book.bookId.toString() === bookId
    );
    if (bookIndex === -1) {
      return res.status(404).json({
        errorMessage: "Book not found",
      });
    }

    user.books[bookIndex].userReview = newReview;
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

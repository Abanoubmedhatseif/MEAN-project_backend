const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const Book = require("../Models/book");

exports.Register = async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
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
  } catch (error) {
    res.status(500).json({
      errorMessage: "error occured",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      res.status(400).json({
        errorMessage: "username is not fount ...",
      });
    }

    const ismatch = await bcrypt.compare(req.body.password, user.password);
    if (!ismatch) {
      res.status(400).json({
        errorMessage: "password is incorrect....",
      });
    }
    const payload = {
      user: {
        // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
      },
    };
    jwt.sign(payload, "asbfdngdfedcfsa", { expiresIn: "7h" }, (err, token) => {
      if (err) {
        console.log("jwt error = ", err);
      }

      res.status(201).json({
        token,
      });
    });
  } catch (error) {
    console.log("signup controller error : ", error);
    res.status(500).json({
      errorMessage: "error occured",
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.books.push(req.body);
    user.save();
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "error occured",
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    const numberOfBooks = books.length;
    if (numberOfBooks === 0) {
      return res.status(200).json({
        successMessage: "there's no book added yet",
      });
    }
    return res.status(200).json({
      "number of books": numberOfBooks,
      "the books": books,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "error occured",
    });
  }
};

exports.getuserBooks = async (req, res) => {
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
      (book) => book.bookId.toString() === bookId,
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
      (book) => book.bookId.toString() === bookId,
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
      (book) => book.bookId.toString() === bookId,
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

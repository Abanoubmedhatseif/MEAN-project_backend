const userRouter = require('express').Router();

const verifyToken = require('../middleware/verify-token');

const {
  userRegisterValidation,
  userLoginValidation,
  validationresult,
  userBookReview,
} = require('../middleware/user-validation');

const {
  Register,
  addBook,
  getUserOneBook,
  getUserBooks,
  updateBookShelve,
  login,
  updateBookRate,
  getAllBooks,
  deleteAllBooks,
  addBookReview,
} = require('../controllers/user');

userRouter.post('/register', userRegisterValidation, validationresult, Register);
userRouter.post('/login', userLoginValidation, validationresult, login);

// Not Protected for non-registered users
userRouter.get('/', getAllBooks);
userRouter.get('/books/:id', getUserOneBook);

// Protected for registered users only
userRouter.get('/books', verifyToken, getUserBooks);
userRouter.post('/books/:id', verifyToken, addBook);

userRouter.patch('/updateShelve/:id', verifyToken, updateBookShelve);
userRouter.patch('/updateRate/:id', verifyToken, updateBookRate);
userRouter.post('/addReview/:id', verifyToken, addBookReview);

userRouter.post('/delete-my-books', verifyToken, deleteAllBooks);

module.exports = userRouter;

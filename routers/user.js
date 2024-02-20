const userRouter = require('express').Router();
const {
  userRegisterValidation, userLoginValidation, validationresult, userBookReview,
} = require('../middleware/validations');
const {
  Register, addBook, getBooks, updateBookShelve, login, updateBookRate, addBookReview,
} = require('../controllers/user');

userRouter.post('/register', userRegisterValidation, validationresult, Register);
userRouter.post('/login', userLoginValidation, validationresult, login);
userRouter.get('/books/:id', getBooks);
userRouter.post('/books/:id', addBook);
userRouter.patch('/updateShelve/:id', updateBookShelve);
userRouter.patch('/updateRate/:id', updateBookRate);
userRouter.post('/addReview/:id', userBookReview, validationresult, addBookReview);

module.exports = userRouter;

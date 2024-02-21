const userRouter = require('express').Router();
const {
  userRegisterValidation, userLoginValidation, validationresult, userBookReview,
} = require('../middleware/user-validation');
const {
  Register, addBook, getuserBooks, updateBookShelve, login, updateBookRate, addBookReview,
} = require('../controllers/user');

userRouter.post('/register', userRegisterValidation, validationresult, Register);
userRouter.post('/login', userLoginValidation, validationresult, login);
userRouter.get('/books/:id', getuserBooks);
userRouter.post('/books/:id', addBook);
userRouter.patch('/updateShelve/:id', updateBookShelve);
userRouter.patch('/updateRate/:id', updateBookRate);
userRouter.post('/addReview/:id', userBookReview, validationresult, addBookReview);

module.exports = userRouter;

const userRouter = require('express').Router();
const {
  Register, addBook, getBooks, updateBookShelve, login, updateBookRate,
} = require('../controllers/user');

userRouter.post('/register', Register);
userRouter.post('/login', login);
userRouter.get('/books/:id', getBooks);
userRouter.post('/books/:id', addBook);
userRouter.patch('/updateShelve/:id', updateBookShelve);
userRouter.patch('/updateRate/:id', updateBookRate);

module.exports = userRouter;

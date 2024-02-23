const userRouter = require("express").Router();

const verifyToken = require("../middleware/verify-token");

const {
  userRegisterValidation,
  userLoginValidation,
  validationresult,
  userBookReview,
} = require("../middleware/user-validation");

const {
  Register,
  addBook,
  getUserOneBook,
  getUserBooks,
  updateBookShelve,
  login,
  updateBookRate,
  getAllBooks,
  addBookReview,
} = require("../controllers/user");


userRouter.post("/register", userRegisterValidation, validationresult, Register);
userRouter.post("/login", userLoginValidation, validationresult, login);

// Not Protected for non-registered users
userRouter.get("/", getAllBooks);
userRouter.get("/books/:id", getUserOneBook);

// Protected for registered users only
userRouter.get("/books", verifyToken, getUserBooks);
userRouter.post("/books/:id", verifyToken, addBook);




userRouter.patch("/updateShelve/:id", updateBookShelve);
// userRouter.patch("/updateRate/:id", updateBookRate);
userRouter.post("/addReview/:id", userBookReview, validationresult, addBookReview);

module.exports = userRouter;

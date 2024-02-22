const { check, validationResult } = require("express-validator");

exports.userRegisterValidation = [
  check("userName").not().isEmpty().withMessage("username is reqired"),
  check("firstName").not().isEmpty().withMessage("firstName is reqired"),
  check("lastName").not().isEmpty().withMessage("lastName is required"),
  check("password").not().isEmpty().withMessage("password is required"),
];

exports.userLoginValidation = [
  check("userName").not().isEmpty().withMessage("username is reqired"),
  check("password").not().isEmpty().withMessage("password is required"),
];

exports.userBookReview = [
  check("userReview").not().isEmpty().withMessage("please fill your review"),
];

exports.validationresult = (req, res, next) => {
  const result = validationResult(req);
  const haserror = !result.isEmpty();

  if (haserror) {
    const firsterror = result.array()[0].msg;
    res.status(400).json({
      errorMessage: firsterror,
    });
  }
  next();
};

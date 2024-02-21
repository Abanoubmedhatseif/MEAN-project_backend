const { check, validationResult } = require('express-validator');

exports.categoryNamingConfirmation = [
  check('categoryName').not().isEmpty().withMessage('categoryName is reqired')
    .isLength({ min: 3 })
    .withMessage('the categoryName must be at least 3 digits')
    .isLength({ max: 12 })
    .withMessage('the categoryName must be at most 12 digits'),
];

exports.validationresult = (req, res, next) => {
  const result = validationResult(req);
  const haserror = !result.isEmpty();

  if (haserror) {
    const firsterror = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firsterror,
    });
  }
  next();
};

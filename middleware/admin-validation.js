const { check, validationResult } = require('express-validator');

exports.adminInformationConfirmation = [
  check('userName').not().isEmpty().withMessage('userName is reqired')
    .isLength({ min: 3 })
    .withMessage('the userName must be at least 3 digits')
    .isLength({ max: 15 })
    .withMessage('the userName must be at most 15 digits'),
  check('password').not().isEmpty().withMessage('password is reqired')
    .isLength({ min: 8 })
    .withMessage('the password must be at least 8 digits'),

];

exports.adminUpdatingConfirmation = [
  check('userName').not().isEmpty().withMessage('userName is reqired')
    .isLength({ min: 3 })
    .withMessage('the userName must be at least 3 digits')
    .isLength({ max: 15 })
    .withMessage('the userName must be at most 15 digits'),

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

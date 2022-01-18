const {check, validationResult} = require('express-validator');

exports.validateUser = [
  check('fullName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail()
    .not()
    .isEmpty()
    .withMessage('Email address required!')
    .bail(),
  check('emailToken')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid / No token provided')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
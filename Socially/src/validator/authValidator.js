const {check, validationResult} = require('express-validator');

module.exports.validateRegisterUser = [
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
    check('userName')
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
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({min: 6})
    .withMessage('Minimum 6 characters required!')
    .bail(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

module.exports.validateLoginUser = [
  
  check('userName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({min: 6})
    .withMessage('Minimum 6 characters required!')
    .bail(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];


module.exports.validateResetPassword = [
  
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('New Password can not be empty!')
    .bail()
    .isLength({min: 6})
    .withMessage('Minimum 6 characters required!')
    .bail(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];





const {check, validationResult} = require('express-validator');

exports.validateFollowRequest = [
  check('id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('id can not be empty!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
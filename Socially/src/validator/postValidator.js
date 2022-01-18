const {check, validationResult} = require('express-validator');

exports.validatePost = [
  check('userId')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User id field can not be empty!')
    .bail(),

  check('caption')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Better to add a caption')
    .bail(),

  check('imgURL')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Image URL not provided')
    .bail(),

    check('imgPath')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Image Path not provided')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

exports.validatePostId = [
    check('postId')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User id field can not be empty!')
      .bail(),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

  exports.validateComment = [
    check('postId')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Post id field can not be empty!')
      .bail(),
  
    check('comment')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Better to add a caption')
      .bail(),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

  exports.validatePostReq = [
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
  
  
  
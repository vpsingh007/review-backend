const { check } = require('express-validator');

exports.userSigninValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be valid email address'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
];


exports.reviewFieldsValidator = [
    check('userName')
        .not()
        .isEmpty()
        .withMessage('property name is required'),
    check('userEmail')
        .isEmail()
        .withMessage('Must be valid email address'),
    check('reviewComment')
        .not()  
        .isEmpty()
        .withMessage('Review Comment is required')
];

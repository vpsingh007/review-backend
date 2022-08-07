const { check } = require('express-validator');

exports.createReviewValidator = [
    check('propertyname')
        .not()
        .isEmpty()
        .withMessage('property name is required'),
    check('reviewTitle')
        .not()
        .isEmpty()
        .withMessage('Review Title is required'),
    check('reviewComment')
        .not()  
        .isEmpty()
        .withMessage('Review Comment is required')
];

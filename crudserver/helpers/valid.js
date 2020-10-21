const {
    check
} = require('express-validator');

exports.validcreatestore = [
    check('storename', 'Storename is required').notEmpty()
    .isLength({
        min:4,
        max:32
    }).withMessage('Storename must be between 3 to 32 characters'),
    check('locality', 'Locality is required').notEmpty()
    .isLength({
        min:3,
        max:32
    }).withMessage('Locality must be between 3 to 32 characters'),
    check('zipcode', 'Zipcode is required').notEmpty()
    .isLength({
        min:3,
        max:32
    }).withMessage('Enter valid Zipcode')
]

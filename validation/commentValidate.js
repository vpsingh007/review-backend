const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateComment(data) {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isLength(data.content, { min: 10 })) {
    errors.content = 'Answer must be at least 10 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

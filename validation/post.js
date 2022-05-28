const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  // data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isLength(data.title, { min: 5, max: 200 })) {
    errors.title = 'Question title must be at least 5 characters';
  }

  // if (Validator.isEmpty(data.content)) {
  //   errors.content = 'Question description is required';
  // }

  if (data.tags.length < 1) {
    errors.tags = 'Tags must be at least 2 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validPassword(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password1 = !isEmpty(data.password1) ? data.password1 : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.password1)) {
    errors.password1 = 'Please enter some value';
  }

  if (!Validator.isLength(data.password1, { min: 6, max: 20 })) {
    errors.password1 = 'password must be between 6 and 20 characters. atleast 1 numeric, 1 special character required.';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = 'Both passwords should be match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

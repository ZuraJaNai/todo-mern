const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password1)) {
    errors.password1 = 'Password field is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.isLength(data.password1, { min: 6 })) {
    errors.password1 = 'Password must be at least 6 characters';
  }

  if (!Validator.isLength(data.password1, { max: 30 })) {
    errors.password1 = 'Password must be less than 30 characters';
  }

  if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

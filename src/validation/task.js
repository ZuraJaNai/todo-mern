const Validator = require('validator');

module.exports = function validateTask(data) {
  const errors = {};
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'You need choose type';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

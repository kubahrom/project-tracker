module.exports.validateProjectInput = (name, category) => {
  const errors = {};
  if (name && name.trim() === '') {
    errors.name = 'Project name must not be empty';
  }
  if (category && category.trim() === '') {
    errors.category = 'Project category must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

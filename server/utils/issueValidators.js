module.exports.validateIssueInput = (name, priority, status) => {
  const errors = {};
  if (name && name.trim() === '') {
    errors.name = 'Issue name must not be empty';
  }
  if (status && status.trim() === '') {
    errors.status = 'Issue status must not be empty';
  }
  if (priority && priority.trim() === '') {
    errors.priority = 'Issue priority must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

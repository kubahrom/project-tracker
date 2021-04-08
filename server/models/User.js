const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model('User', userSchema, 'users');

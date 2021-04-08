const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
  name: String,
  description: String,
  createdAt: String,
  category: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  shared: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Project', projectSchema, 'projects');

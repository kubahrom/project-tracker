const { model, Schema } = require('mongoose');

const issueSchema = new Schema({
  name: String,
  description: String,
  createdAt: String,
  updatedAt: String,
  type: String,
  status: String,
  priority: String,
  estimatedTime: Number,
  timet: Number,
  timeRemaining: Number,
  timeSpent: Number,
  index: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  reporter: { type: Schema.Types.ObjectId, ref: 'User' },
  asignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: 'User' },
      body: String,
      createdAt: String,
    },
  ],
});

module.exports = model('Issue', issueSchema, 'issues');

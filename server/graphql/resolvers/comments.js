const Issue = require('../../models/Issue');
const checkAuth = require('../../utils/checkAuth');
const checkProjectAccess = require('../../utils/checkProjectAccess');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
  Mutation: {
    async createComment(_, { issueId, projectId, body }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          if (body.trim() === '') {
            throw new UserInputError('Empty comment', {
              errors: {
                body: 'Comment body must be not empty',
              },
            });
          }
          const issue = await Issue.findById(issueId);
          if (issue) {
            issue.comments.unshift({
              id,
              author: id,
              body,
              createdAt: new Date().toISOString(),
            });
            await issue.save().then(t => {
              return t.populate('comments.author').execPopulate();
            });
            return issue;
          }
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    //TODO: Update comment
    async updateComment(_, { issueId, projectId, commentId, body }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          const issue = await Issue.findById(issueId);
          if (issue) {
            const commentIndex = issue.comments.findIndex(
              c => c.id === commentId
            );
            if (
              issue.comments[commentIndex].author.toString() === id ||
              issue.author.toString() === id
            ) {
              //Update
              const comment = issue.comments[commentIndex];
              comment.body = body;
              comment.updated = true;
              const updatedCommentIssue = await Issue.findByIdAndUpdate(
                issueId,
                { comments: issue.comments },
                { new: true }
              ).then(t => {
                return t.populate('comments.author').execPopulate();
              });
              return updatedCommentIssue;
            } else {
              throw new AuthenticationError('Action not allowed');
            }
          } else {
            throw new UserInputError('Issue not found');
          }
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteComment(_, { issueId, projectId, commentId }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          const issue = await Issue.findById(issueId);
          if (issue) {
            const commentIndex = issue.comments.findIndex(
              c => c.id === commentId
            );
            if (
              issue.comments[commentIndex].author.toString() === id ||
              issue.author.toString() === id
            ) {
              issue.comments.splice(commentIndex, 1);
              await issue.save().then(t => {
                return t.populate('comments.author').execPopulate();
              });
              return issue;
            } else {
              throw new AuthenticationError('Action not allowed');
            }
          } else {
            throw new UserInputError('Issue not found');
          }
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

const Issue = require('../../models/Issue');
const checkAuth = require('../../utils/checkAuth');
const checkProjectAccess = require('../../utils/checkProjectAccess');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { validateIssueInput } = require('../../utils/issueValidators');

module.exports = {
  Query: {
    async getIssues(_, { projectId }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          const issues = await Issue.find({ project: projectId })
            .populate('author')
            .populate('project')
            .populate('reporter')
            .populate('asignees');
          return issues;
        } else {
          throw new Error('Issues not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getIssue(_, { projectId, issueId }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          const issue = await Issue.findById(issueId)
            .populate('author')
            .populate('project')
            .populate('reporter')
            .populate('asignees')
            .populate('comments.author');
          return issue;
        } else {
          throw new Error('Issue not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createIssue(
      _,
      {
        createIssueInput: {
          name,
          description,
          status,
          index,
          projectId,
          reporter,
          asignees,
          priority,
        },
      },
      context
    ) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          const { valid, errors } = validateIssueInput(name, status, priority);
          if (!valid) {
            throw new UserInputError('Errors', errors);
          }

          const newIssue = new Issue({
            name,
            description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status,
            project: projectId,
            author: id,
            reporter,
            index,
            asignees,
            comments: [],
            priority,
          });

          const issue = await newIssue.save().then(t => {
            return t
              .populate('author')
              .populate('project')
              .populate('reporter')
              .populate('asignees')
              .execPopulate();
          });

          return issue;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateIssue(_, { updateIssueInput }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(
          id,
          updateIssueInput.projectId
        );
        if (checkProject) {
          const { valid, errors } = validateIssueInput(
            updateIssueInput.name,
            updateIssueInput.status,
            updateIssueInput.priority
          );
          if (!valid) {
            throw new UserInputError('Errors', errors);
          }
          const issue = await Issue.findById(updateIssueInput.issueId);
          if (
            issue.author.toString() === id ||
            issue.reporter.toString() === id
          ) {
            const updatedFields = {};
            let fieldsToUpdate = Object.keys(updateIssueInput);
            fieldsToUpdate = fieldsToUpdate.slice(2);
            fieldsToUpdate.map(parameter => {
              updatedFields[parameter] = updateIssueInput[parameter];
            });
            const updatedIssue = await Issue.findByIdAndUpdate(
              updateIssueInput.issueId,
              updatedFields,
              { new: true }
            ).then(t => {
              return t
                .populate('author')
                .populate('project')
                .populate('reporter')
                .populate('asignees')
                .execPopulate();
            });
            return updatedIssue;
          } else {
            throw new AuthenticationError('Action not allowed');
          }
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteIssue(_, { issueId, projectId }, context) {
      const { id } = checkAuth(context);
      try {
        const checkProject = await checkProjectAccess(id, projectId);
        if (checkProject) {
          const issue = await Issue.findById(issueId);
          if (
            issue.author.toString() === id ||
            issue.reporter.toString() === id
          ) {
            await issue.delete();
            return 'Issue deleted successfully';
          } else {
            throw new AuthenticationError('Action not allowed');
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

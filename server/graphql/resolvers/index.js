const usersResolvers = require('./users');
const projectsResolvers = require('./projects');
const issuesResolvers = require('./issues');
const commentsResolvers = require('./comments');

module.exports = {
  Issue: {
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  Query: {
    ...usersResolvers.Query,
    ...projectsResolvers.Query,
    ...issuesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...projectsResolvers.Mutation,
    ...issuesResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};

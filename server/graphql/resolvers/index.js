const usersResolvers = require('./users');
const projectsResolvers = require('./projects');
const issuesResolvers = require('./issues');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...projectsResolvers.Query,
    ...issuesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...projectsResolvers.Mutation,
    ...issuesResolvers.Mutation,
  },
};

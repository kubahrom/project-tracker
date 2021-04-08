const usersResolvers = require('./users');
const projectsResolvers = require('./projects');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...projectsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...projectsResolvers.Mutation,
  },
};

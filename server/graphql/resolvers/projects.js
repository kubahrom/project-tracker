const Project = require('../../models/Project');
const User = require('../../models/User');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { validateProjectInput } = require('../../utils/projectValidators');
const { findById } = require('../../models/Project');

module.exports = {
  Query: {
    async getProjects(_, agrs, context) {
      const { id } = checkAuth(context);
      try {
        const projects = await Project.find({ author: id })
          .populate('author')
          .populate('shared');
        return projects;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getProject(_, { projectId }, context) {
      const { id } = checkAuth(context);
      try {
        const project = await Project.findOne({
          _id: projectId,
          author: id,
        })
          .populate('author')
          .populate('shared');
        if (project) {
          return project;
        } else {
          throw new Error('Project not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createProject(
      _,
      { createProjectInput: { name, description, category } },
      context
    ) {
      const { id } = checkAuth(context);
      try {
        const { valid, errors } = validateProjectInput(name, category);
        if (!valid) {
          throw new UserInputError('Errors', errors);
        }
        const newProject = new Project({
          name,
          description,
          category,
          createdAt: new Date().toISOString(),
          author: id,
          shared: [],
        });
        const project = await newProject.save().then(t => {
          return t.populate('author').execPopulate();
        });

        return project;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateProject(
      _,
      {
        updateProjectInput: { projectId, name, description, category, shared },
      },
      context
    ) {
      const { id } = checkAuth(context);
      try {
        const { valid, errors } = validateProjectInput(name, category);
        if (!valid) {
          throw new UserInputError('Errors', errors);
        }

        const updatedFields = {
          name,
          description,
          category,
          shared,
        };
        const project = await Project.findById(projectId);
        if (project.author.toString() === id) {
          const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            updatedFields,
            { new: true }
          ).then(t => {
            return t.populate('author').execPopulate();
          });
          return updatedProject;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteProject(_, { projectId }, context) {
      const { id } = checkAuth(context);
      //TODO: delete issues from deleted project
      try {
        const project = await Project.findById(projectId);
        if (project.author.toString() === id) {
          await project.delete();
          return 'Project deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

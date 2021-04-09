const Project = require('../../models/Project');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { validateProjectInput } = require('../../utils/projectValidators');

module.exports = {
  Query: {
    async getProjects(_, agrs, context) {
      const { id } = checkAuth(context);
      try {
        const projects = await Project.find({
          $or: [{ author: id }, { shared: id }],
        })
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
          $or: [
            { _id: projectId, author: id },
            { _id: projectId, shared: id },
          ],
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
          return t.populate('author').populate('shared').execPopulate();
        });

        return project;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateProject(_, { updateProjectInput }, context) {
      const { id } = checkAuth(context);
      try {
        const { valid, errors } = validateProjectInput(
          updateProjectInput.name,
          updateProjectInput.category
        );
        if (!valid) {
          throw new UserInputError('Errors', errors);
        }

        const project = await Project.findById(updateProjectInput.projectId);
        if (project.author.toString() === id) {
          const updatedFields = {};
          const fieldsToUpdate = Object.keys(updateProjectInput);
          fieldsToUpdate.shift();
          fieldsToUpdate.map(parameter => {
            updatedFields[parameter] = updateProjectInput[parameter];
          });
          const updatedProject = await Project.findByIdAndUpdate(
            updateProjectInput.projectId,
            updatedFields,
            { new: true }
          ).then(t => {
            return t.populate('author').populate('shared').execPopulate();
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

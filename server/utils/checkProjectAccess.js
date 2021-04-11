const Project = require('../models/Project');

module.exports = async (userId, projectId) => {
  const project = await Project.findById(projectId);
  if (project) {
    const shared = await project.shared.filter(
      uId => uId.toString() === userId
    );
    if (project.author.toString() === userId || shared.length !== 0) {
      return true;
    } else {
      return false;
    }
  } else {
    throw new Error('Project not found');
  }
};

const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    lastName: String!
    createdAt: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    category: String!
    createdAt: String!
    author: User!
    shared: [User]!
  }

  input CreateProjectInput {
    name: String!
    description: String
    category: String!
  }

  input UpdateProjectInput {
    projectId: ID!
    name: String!
    description: String
    category: String!
    shared: [ID]!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getProjects: [Project]
    getProject(projectId: ID!): Project
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createProject(createProjectInput: CreateProjectInput): Project!
    deleteProject(projectId: ID!): String!
    updateProject(updateProjectInput: UpdateProjectInput): Project!
  }
`;

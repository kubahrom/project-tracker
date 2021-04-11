const { gql } = require('apollo-server');

module.exports = gql`
  # USER________________________________________
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

  # PROJECT_______________________________________
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
    name: String
    description: String
    category: String
    shared: [ID]
  }

  # ISSUE_________________________________________
  type Issue {
    id: ID!
    name: String!
    description: String
    createdAt: String!
    updatedAt: String!
    status: String!
    priority: String!
    estimatedTime: Int
    timeSpend: Int
    timeRemaining: Int
    project: Project!
    author: User!
    reporter: User
    asignees: [User]!
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    createdAt: String!
    body: String!
    author: User!
  }

  input CreateIssueInput {
    name: String!
    description: String
    status: String!
    priority: String!
    estimatedTime: Int
    timeSpend: Int
    timeRemaining: Int
    projectId: ID!
    reporter: ID
    asignees: [ID]
  }

  input UpdateIssueInput {
    issueId: ID!
    projectId: ID!
    name: String
    description: String
    status: String
    priority: String
    estimatedTime: Int
    timeSpend: Int
    timeRemaining: Int
    reporter: ID
    asignees: [ID]
  }

  # QUERY___________________________________________

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getProjects: [Project]
    getProject(projectId: ID!): Project
    getIssues(projectId: ID!): [Issue]
    getIssue(issueId: ID!, projectId: ID!): Issue
  }

  # MUTATION_________________________________________

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createProject(createProjectInput: CreateProjectInput): Project!
    updateProject(updateProjectInput: UpdateProjectInput): Project!
    deleteProject(projectId: ID!): String!
    createIssue(createIssueInput: CreateIssueInput): Issue!
    updateIssue(updateIssueInput: UpdateIssueInput): Issue!
    deleteIssue(issueId: ID!, projectId: ID!): String!
    createComment(issueId: ID!, projectId: ID!, body: String!): Issue!
    deleteComment(issueId: ID!, projectId: ID!, commentId: ID!): Issue!
  }
`;

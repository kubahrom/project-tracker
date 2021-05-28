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
    type: String!
    status: String!
    priority: String!
    estimatedTime: Int
    timeSpent: Int
    timeRemaining: Int
    index: String
    project: Project!
    author: User!
    reporter: User
    asignees: [User]!
    comments: [Comment]!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: String!
    body: String!
    author: User!
    updated: Boolean
  }

  input CreateIssueInput {
    name: String!
    description: String
    type: String!
    status: String!
    index: String!
    projectId: ID!
    reporter: ID!
    asignees: [ID]
    priority: String!
  }

  input UpdateIssueInput {
    issueId: ID!
    projectId: ID!
    name: String
    description: String
    type: String
    status: String
    priority: String
    estimatedTime: Int
    index: String
    timeSpent: Int
    timeRemaining: Int
    reporter: ID
    asignees: [ID]
  }

  # QUERY___________________________________________

  type Query {
    getUsers: [User]!
    getUser(userId: ID!): User
    getProjects: [Project]!
    getProject(projectId: ID!): Project
    getIssues(projectId: ID!): [Issue]!
    getIssue(issueId: ID!, projectId: ID!): Issue
    getIssuesByUserId: [Issue]!
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
    updateComment(
      issueId: ID!
      projectId: ID!
      commentId: ID!
      body: String!
    ): Issue!
    deleteComment(issueId: ID!, projectId: ID!, commentId: ID!): Issue!
  }
`;

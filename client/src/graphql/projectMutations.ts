import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String
    $category: String!
  ) {
    createProject(
      createProjectInput: {
        name: $name
        description: $description
        category: $category
      }
    ) {
      id
      name
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $projectId: ID!
    $name: String
    $description: String
    $category: String
    $shared: [ID]
  ) {
    updateProject(
      updateProjectInput: {
        projectId: $projectId
        name: $name
        description: $description
        category: $category
        shared: $shared
      }
    ) {
      id
      name
      description
      category
      createdAt
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId)
  }
`;

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

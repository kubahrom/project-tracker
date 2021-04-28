import gql from 'graphql-tag';

export const CREATE_ISSUE = gql`
  mutation createIssue(
    $name: String!
    $description: String
    $projectId: ID!
    $reporter: ID!
    $asignees: [ID]
    $index: String!
    $status: String!
  ) {
    createIssue(
      createIssueInput: {
        name: $name
        description: $description
        projectId: $projectId
        reporter: $reporter
        asignees: $asignees
        index: $index
        status: $status
      }
    ) {
      id
      name
      status
      index
    }
  }
`;

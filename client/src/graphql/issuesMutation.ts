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

//FIXME: update when update issue needed
export const UPDATE_ISSUE = gql`
  mutation updateIssue(
    $issueId: ID!
    $projectId: ID!
    $name: String
    $description: String
    $status: String
    $priority: String
    $estimatedTime: Int
    $timeSpend: Int
    $timeRemaining: Int
    $index: String
    $reporter: ID
    $asignees: [ID]
  ) {
    updateIssue(
      updateIssueInput: {
        issueId: $issueId
        projectId: $projectId
        name: $name
        description: $description
        status: $status
        priority: $priority
        estimatedTime: $estimatedTime
        timeSpend: $timeSpend
        timeRemaining: $timeRemaining
        index: $index
        reporter: $reporter
        asignees: $asignees
      }
    ) {
      id
      name
      index
    }
  }
`;

export const UPDATE_BOARD_ISSUE = gql`
  mutation updateBoardIssue(
    $issueId: ID!
    $projectId: ID!
    $status: String
    $index: String
  ) {
    updateIssue(
      updateIssueInput: {
        issueId: $issueId
        projectId: $projectId
        status: $status
        index: $index
      }
    ) {
      id
      name
      status
      index
    }
  }
`;

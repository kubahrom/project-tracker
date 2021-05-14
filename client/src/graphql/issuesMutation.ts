import gql from 'graphql-tag';

export const CREATE_ISSUE = gql`
  mutation createIssue(
    $name: String!
    $description: String
    $projectId: ID!
    $reporter: ID!
    $asignees: [ID]
    $type: String!
    $index: String!
    $status: String!
    $priority: String!
  ) {
    createIssue(
      createIssueInput: {
        name: $name
        description: $description
        projectId: $projectId
        reporter: $reporter
        asignees: $asignees
        type: $type
        index: $index
        status: $status
        priority: $priority
      }
    ) {
      id
      name
      description
      reporter {
        id
        firstName
        lastName
      }
      asignees {
        id
        firstName
        lastName
      }
      status
      type
      index
      priority
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
    $timeSpent: Int
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
        timeSpent: $timeSpent
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

export const DELETE_ISSUE = gql`
  mutation deleteIssue($issueId: ID!, $projectId: ID!) {
    deleteIssue(issueId: $issueId, projectId: $projectId)
  }
`;

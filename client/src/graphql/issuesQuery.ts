import gql from 'graphql-tag';

export const GET_ISSUES = gql`
  query getIssues($projectId: ID!) {
    getIssues(projectId: $projectId) {
      id
      name
      status
      type
      index
      priority
      asignees {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_ISSUE = gql`
  query getIssue($issueId: ID!, $projectId: ID!) {
    getIssue(issueId: $issueId, projectId: $projectId) {
      id
      name
      description
      status
      priority
      type
      author {
        id
        firstName
        lastName
      }
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
      comments {
        id
        body
        createdAt
        updated
        author {
          id
          firstName
          lastName
        }
      }
      estimatedTime
      timeSpent
      timeRemaining
      createdAt
      updatedAt
    }
  }
`;

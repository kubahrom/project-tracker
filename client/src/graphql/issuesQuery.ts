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
      commentCount
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

export const GET_ISSUES_BY_ID = gql`
  query getIssuesByUserId {
    getIssuesByUserId {
      id
      name
      type
      project {
        id
        name
      }
      updatedAt
      author {
        id
      }
      reporter {
        id
      }
      asignees {
        id
      }
      priority
      status
    }
  }
`;

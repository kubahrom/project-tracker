import gql from 'graphql-tag';

export const GET_ISSUES = gql`
  query getIssues($projectId: ID!) {
    getIssues(projectId: $projectId) {
      id
      name
      status
      index
    }
  }
`;
// FIXME: add anotehr fields based on need
export const GET_ISSUE = gql`
  query getIssue($issueId: ID!, $projectId: ID!) {
    getIssue(issueId: $issueId, projectId: $projectId) {
      id
      name
      status
      priority
      reporter {
        id
        firstName
        lastName
      }
      estimatedTime
    }
  }
`;

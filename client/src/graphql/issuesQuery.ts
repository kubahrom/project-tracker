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

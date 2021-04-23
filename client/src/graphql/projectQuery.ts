import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($projectId: ID!) {
    getProject(projectId: $projectId) {
      id
      name
      description
      category
      createdAt
      shared {
        id
        firstName
        lastName
      }
    }
  }
`;

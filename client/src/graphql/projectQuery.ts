import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      author {
        id
        firstName
        lastName
      }
      shared {
        id
        firstName
        lastName
      }
      createdAt
      category
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
      author {
        id
        firstName
        lastName
      }
      shared {
        id
        firstName
        lastName
      }
    }
  }
`;

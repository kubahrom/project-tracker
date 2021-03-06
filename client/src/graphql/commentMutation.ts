import gql from 'graphql-tag';

export const CREATE_COMMENT = gql`
  mutation createComment($issueId: ID!, $projectId: ID!, $body: String!) {
    createComment(issueId: $issueId, projectId: $projectId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        author {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $issueId: ID!
    $projectId: ID!
    $commentId: ID!
    $body: String!
  ) {
    updateComment(
      issueId: $issueId
      projectId: $projectId
      commentId: $commentId
      body: $body
    ) {
      id
      comments {
        id
        body
        createdAt
        updated
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($issueId: ID!, $projectId: ID!, $commentId: ID!) {
    deleteComment(
      issueId: $issueId
      projectId: $projectId
      commentId: $commentId
    ) {
      id
      comments {
        id
        body
        createdAt
        author {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

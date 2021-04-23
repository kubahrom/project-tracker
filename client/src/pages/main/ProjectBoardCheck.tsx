import { gql, useApolloClient, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { GET_PROJECT } from '../../graphql/projectQuery';
import PageNotFound from '../other/PageNotFound';
import ProjectBoard from './ProjectBoard';

interface ParamType {
  projectId: string;
}

const ProjectBoardCheck: React.FC = () => {
  const { projectId } = useParams<ParamType>();
  const client = useApolloClient();
  const cachedProject = client.readFragment({
    id: `Project:${projectId}`,
    fragment: gql`
      fragment ProjectParts on Project {
        id
        name
        description
        createdAt
        category
        shared {
          id
          firstName
          lastName
        }
      }
    `,
  });
  const { loading } = useQuery(GET_PROJECT, {
    variables: {
      projectId,
    },
    skip: Boolean(cachedProject),
  });
  if (!cachedProject && !loading) {
    return <PageNotFound />;
  }
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ProjectBoard project={cachedProject} />
      )}
    </>
  );
};

export default ProjectBoardCheck;

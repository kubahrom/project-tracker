import { gql, useApolloClient, useQuery } from '@apollo/client';
import { CircularProgress, Paper } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { GET_PROJECT } from '../../graphql/project_query';
import { useBoardStyles } from '../../styles/muiStyles';
import PageNotFound from '../other/PageNotFound';

interface ParamType {
  projectId: string;
}

const ProjectSettings: React.FC = () => {
  const { projectId } = useParams<ParamType>();
  const client = useApolloClient();
  const classes = useBoardStyles();
  const cachedProject = client.readFragment({
    id: `Project:${projectId}`,
    fragment: gql`
      fragment ProjectParts on Project {
        id
        name
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
    <div>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <Paper style={{ padding: 40 }}>
          this is settings page for ID {cachedProject.name}
        </Paper>
      )}
    </div>
  );
};

export default ProjectSettings;

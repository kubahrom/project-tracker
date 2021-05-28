import { ApolloError, useQuery } from '@apollo/client';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { GET_PROJECTS } from '../../graphql/projectQuery';
import { useYourProjectsStyle } from '../../styles/muiStyles';
import ProjectCard from './ProjectCard';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IProject {
  id: string;
  name: string;
  author: IUser;
  shared: IUser[];
  createdAt: string;
  category: string;
}

interface IProjectQuery {
  getProjects: IProject[];
}

const YourProjects = () => {
  const classes = useYourProjectsStyle();
  const { data: { getProjects: projects } = {}, loading } =
    useQuery<IProjectQuery>(GET_PROJECTS, {
      onError(err: ApolloError) {
        console.log(err);
      },
    });

  return (
    <div>
      <Typography variant="h5" component="h1" className={classes.title}>
        Your Projects
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container className={classes.cardWrapper}>
          {projects?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default YourProjects;

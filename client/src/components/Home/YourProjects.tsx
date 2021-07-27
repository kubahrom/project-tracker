import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { IProject } from '../../pages/main/Home';
import { useYourProjectsStyles } from '../../styles/muiStyles';
import ProjectCard from './ProjectCard';

interface IYourProjectsProps {
  projects: IProject[];
}

const YourProjects = ({ projects }: IYourProjectsProps) => {
  const classes = useYourProjectsStyles();

  return (
    <div>
      <Typography variant="h5" component="h1" className={classes.title}>
        Your Projects
      </Typography>

      <Grid container className={classes.cardWrapper}>
        {projects.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Grid>
    </div>
  );
};

export default YourProjects;

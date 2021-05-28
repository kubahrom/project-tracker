import { Avatar, Card, Chip, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useYourProjectsStyle } from '../../styles/muiStyles';
import { IProject } from './YourProjects';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
  const classes = useYourProjectsStyle();
  return (
    <Grid item md={4} sm={6} xs={12} className={classes.gridItem}>
      <Link to={`/project/${project.id}`}>
        <Card className={classes.card}>
          <Typography variant="h5" component="h2">
            {project.name}
          </Typography>
          <Typography
            variant="overline"
            component="p"
            className={clsx(classes.helperText, classes.subTitle)}
          >
            {project.category}
          </Typography>
          <Typography>
            <span className={classes.helperText}>Created at: </span>
            {new Date(project.createdAt).toLocaleString()}
          </Typography>
          <Typography component="div">
            <span className={classes.helperText}>Author: </span>
            <Chip
              key={project.author.id}
              label={`${project.author.firstName} ${project.author.lastName}`}
              size="small"
              className={classes.chip}
              color="primary"
              avatar={
                <Avatar>
                  {project.author.firstName[0]}
                  {project.author.lastName[0]}
                </Avatar>
              }
            />
          </Typography>
          {project.shared.length > 0 && (
            <Typography component="div">
              <span className={classes.helperText}>Shared: </span>
              {project.shared.map((user: IUser) => (
                <Chip
                  key={user.id}
                  label={`${user.firstName} ${user.lastName}`}
                  size="small"
                  className={classes.chip}
                  color="default"
                  avatar={
                    <Avatar>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </Avatar>
                  }
                />
              ))}
            </Typography>
          )}
        </Card>
      </Link>
    </Grid>
  );
};

export default ProjectCard;

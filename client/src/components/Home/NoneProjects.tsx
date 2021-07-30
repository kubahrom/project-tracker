import { Button, Typography } from '@material-ui/core';
import { DeveloperBoard } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNoneProjectsStyles } from '../../styles/muiStyles';

const NoneProjects = () => {
  const classes = useNoneProjectsStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" component="h1" className={classes.title}>
        <DeveloperBoard color="primary" className={classes.logo} />
        You don't have any project yet.
      </Typography>
      <Typography
        align="center"
        variant="h6"
        component="h2"
        color="textSecondary"
        className={classes.subtitle}
      >
        Stop hesitating and let's create a new one.
      </Typography>
      <Button
        component={Link}
        to="/project/create"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Create Project
      </Button>
    </div>
  );
};

export default NoneProjects;

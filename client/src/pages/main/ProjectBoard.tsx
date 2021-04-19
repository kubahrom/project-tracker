import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import Board from '../../components/Board/Board';
import { useBoardPageStyles } from '../../styles/muiStyles';

interface IProjectProps {
  project: {
    id: string;
    name: string;
    category: string;
    description: string;
    createdAt: string;
    __typename: string;
  };
}

const ProjectBoard = ({ project }: IProjectProps) => {
  const classes = useBoardPageStyles();
  return (
    <Paper elevation={2}>
      <div className={classes.pageWrapper}>
        <div className={classes.pageHeader}>
          <div className={classes.titleWrapper}>
            <Typography variant="h4" component="h1" color="primary">
              {project.name}
            </Typography>
            <Typography variant="body1" component="span">
              Kanban board
            </Typography>
          </div>
          <Typography variant="body1" component="p">
            <span className={classes.helperText}>Category: </span>
            {project.category}
          </Typography>
          <Typography variant="body1" component="p">
            <span className={classes.helperText}>Created At: </span>
            {new Date(project.createdAt).toLocaleString()}
          </Typography>
          {project.description && (
            <>
              <Typography variant="body1" component="p">
                <span className={classes.helperText}>Description: </span>
                {project.description}
              </Typography>
            </>
          )}
        </div>
        <Board projectId={project.id} />
      </div>
    </Paper>
  );
};

export default ProjectBoard;

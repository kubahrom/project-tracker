import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useBoardStyles } from '../../styles/muiStyles';
import { IIssue } from './Board';

interface IIssueProps {
  issue: IIssue;
}

const Issue = ({ issue }: IIssueProps) => {
  const classes = useBoardStyles();
  return (
    <Paper elevation={2} className={classes.issue}>
      <Typography variant="subtitle1" component="span">
        {issue.name}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {issue.status}
      </Typography>
    </Paper>
  );
};

export default Issue;

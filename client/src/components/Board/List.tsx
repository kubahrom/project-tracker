import { Typography } from '@material-ui/core';
import React from 'react';
import { useBoardStyles } from '../../styles/muiStyles';
import { IIssue } from './Board';
import Issue from './Issue';

interface IListProps {
  status: string;
  issues: IIssue[];
}

const List = ({ issues, status }: IListProps) => {
  const classes = useBoardStyles();
  return (
    <div className={classes.list}>
      <Typography
        variant="caption"
        className={classes.listCaption}
        align="center"
      >
        {status.toUpperCase()}
      </Typography>
      <div className={classes.issueWrapper}>
        {issues.map((issue: IIssue) => (
          <Issue issue={issue} key={issue.id} />
        ))}
      </div>
    </div>
  );
};

export default List;

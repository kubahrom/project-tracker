import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useYourIssuesStyles } from '../../styles/muiStyles';

interface INoneIssueProps {
  resetFilter?: () => void;
}

const NoneIssue = ({ resetFilter }: INoneIssueProps) => {
  const classes = useYourIssuesStyles();
  return (
    <div className={classes.noneIssueWrapper}>
      {resetFilter ? (
        <>
          <Typography
            variant="h6"
            component="h4"
            color="textSecondary"
            className={classes.noneIssueText}
          >
            None of yours issues match your filter.
          </Typography>
          <Button variant="outlined" color="primary" onClick={resetFilter}>
            Reset filter
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant="h6"
            component="h4"
            color="textSecondary"
            className={classes.noneIssueText}
          >
            You don't have any issues yet.
          </Typography>
        </>
      )}
    </div>
  );
};

export default NoneIssue;

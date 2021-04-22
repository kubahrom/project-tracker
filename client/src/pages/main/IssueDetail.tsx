import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useIssueModalStyle } from '../../styles/muiStyles';

const IssueDetail = () => {
  const classes = useIssueModalStyle();
  return (
    <div className={classes.modalWrapper}>
      <Typography variant="h4" component="h1">
        Issue detail
      </Typography>
      <div className={classes.formWrapper}>
        {/* name, description, reporter, asignees, priority */}
        <form>
          <TextField />
        </form>
      </div>
    </div>
  );
};

export default IssueDetail;

import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useIssueModalStyle } from '../../styles/muiStyles';

const CreateIssue = () => {
  const classes = useIssueModalStyle();
  return (
    <div className={classes.modalWrapper}>
      <Typography variant="h4" component="h1">
        Create Issue
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

export default CreateIssue;

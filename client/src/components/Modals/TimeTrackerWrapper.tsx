import { Dialog, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useIssueDetailStyles } from '../../styles/muiStyles';
import TimeTracker from '../Other/TimeTracker';
import UpdateTimeTracker from './UpdateTimeTracker';

interface IProps {
  estimatedTime: number;
  timeSpent: number;
  timeRemaining: number;
}

const TimeTrackerWrapper = ({
  estimatedTime,
  timeSpent,
  timeRemaining,
}: IProps) => {
  const classes = useIssueDetailStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={classes.timeTrackerWrapper} onClick={handleClick}>
        <Typography variant="overline" component="p">
          <span className={classes.helperText}>Time tracking:</span>
        </Typography>

        <TimeTracker
          estimatedTime={estimatedTime}
          timeSpent={timeSpent}
          timeRemaining={timeRemaining}
        />
      </div>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <UpdateTimeTracker
          handleClose={handleClose}
          estimatedTime={estimatedTime}
          timeSpent={timeSpent}
          timeRemaining={timeRemaining}
        />
      </Dialog>
    </>
  );
};

export default TimeTrackerWrapper;

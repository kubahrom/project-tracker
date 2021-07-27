import { ApolloError, useMutation } from '@apollo/client';
import {
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { UPDATE_ISSUE_TIME } from '../../graphql/issuesMutation';
import { useTimeTrackerStyles } from '../../styles/muiStyles';
import TimeTracker from '../Other/TimeTracker';
import CloseModalBtn from './CloseModalBtn';

interface IProps {
  handleClose: () => void;
  estimatedTime: number;
  timeSpent: number;
  timeRemaining: number;
}

interface ITimeValues {
  estimatedTime: string;
  timeSpent: string;
  timeRemaining: string;
}

const UpdateTimeTracker = ({
  handleClose,
  estimatedTime,
  timeSpent,
  timeRemaining,
}: IProps) => {
  const classes = useTimeTrackerStyles();
  const { sidebarState } = useContext(ProjectContext);
  const { issueState } = useContext(IssueContext);
  const [timeValues, setTimeValues] = useState<ITimeValues>({
    estimatedTime: '',
    timeSpent: '',
    timeRemaining: '',
  });

  const [updateIssue, { loading }] = useMutation(UPDATE_ISSUE_TIME, {
    onError(err: ApolloError) {
      console.log(err);
    },
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateIssue({
      variables: {
        issueId: issueState.issueId,
        projectId: sidebarState.currProject,
        timeSpent: timeValues.timeSpent ? parseInt(timeValues.timeSpent) : null,
        timeRemaining: timeValues.timeRemaining
          ? parseInt(timeValues.timeRemaining)
          : null,
      },
    });
    handleClose();
  };

  useEffect(() => {
    setTimeValues({
      estimatedTime: estimatedTime !== null ? estimatedTime.toString() : '',
      timeSpent: timeSpent !== null ? timeSpent.toString() : '',
      timeRemaining: timeRemaining !== null ? timeRemaining.toString() : '',
    });
  }, [estimatedTime, timeSpent, timeRemaining]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    const regex = /^[0-9\b]{0,6}$/;
    if (value === '' || regex.test(value)) {
      setTimeValues({
        ...timeValues,
        //Delete multiple nulls from start
        [name]: value === '' ? '' : parseInt(value).toString(),
      });
    }
  };

  return (
    <>
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Typography variant="h5" component="h2">
          Update Timer
        </Typography>
        <CloseModalBtn handleClose={handleClose} />
      </DialogTitle>
      <DialogContent>
        <TimeTracker
          estimatedTime={
            timeValues.estimatedTime !== ''
              ? parseInt(timeValues.estimatedTime)
              : null
          }
          timeSpent={
            timeValues.timeSpent !== '' ? parseInt(timeValues.timeSpent) : null
          }
          timeRemaining={
            timeValues.timeRemaining !== ''
              ? parseInt(timeValues.timeRemaining)
              : null
          }
        />
        <form name="trackerForm" noValidate className={classes.form}>
          <div className={classes.inputWrapper}>
            <div className={classes.inputField}>
              <TextField
                fullWidth
                label="Time spent (hours)"
                type="text"
                size="small"
                variant="outlined"
                name="timeSpent"
                value={timeValues.timeSpent}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <></>,
                }}
              />
            </div>
            <div className={classes.inputField}>
              <TextField
                fullWidth
                label="Time remaining (hours)"
                type="text"
                size="small"
                name="timeRemaining"
                variant="outlined"
                value={timeValues.timeRemaining}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <></>,
                }}
              />
            </div>
          </div>
          <div className={classes.dialogActions}>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
              onClick={handleSubmit}
            >
              Update Timer
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  );
};

export default UpdateTimeTracker;

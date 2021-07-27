import { LinearProgress } from '@material-ui/core';
import { Alarm } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useIssueDetailStyles } from '../../styles/muiStyles';

interface IProps {
  estimatedTime: number | null;
  timeSpent: number | null;
  timeRemaining: number | null;
}

const TimeTracker = ({ estimatedTime, timeSpent, timeRemaining }: IProps) => {
  const classes = useIssueDetailStyles();
  const [timeProgress, setTimeProgress] = useState<number>(0);
  useEffect(() => {
    let timeValue: number = 0;
    if (timeSpent && timeRemaining !== null) {
      timeValue = (timeSpent * 100) / (timeRemaining + timeSpent);
    } else if (timeSpent && estimatedTime) {
      timeValue =
        timeSpent > estimatedTime ? 100 : (timeSpent * 100) / estimatedTime;
    } else if (timeSpent) {
      timeValue = 100;
    }
    setTimeProgress(timeValue);
  }, [timeSpent, timeRemaining, estimatedTime]);

  return (
    <div className={classes.timeTracker}>
      <Alarm />
      <div className={classes.progressWrapper}>
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={timeProgress}
        />
        <div className={classes.progressValues}>
          <span className={classes.timeNumber}>
            {timeSpent ? <>{timeSpent}h logged</> : 'No time logged'}
          </span>
          <span className={classes.timeNumber}>
            {timeRemaining !== null ? <>{timeRemaining}h remaining</> : ''}
            {timeRemaining === null && estimatedTime !== null ? (
              <>
                {timeSpent !== null
                  ? estimatedTime > timeSpent
                    ? estimatedTime - timeSpent
                    : 0
                  : estimatedTime}
                h remaining
              </>
            ) : (
              ''
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;

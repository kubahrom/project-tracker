import {
  Avatar,
  Chip,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIssueDetail } from '../../styles/muiStyles';
import DOMPurify from 'dompurify';
import PriorityArrow from '../../components/Other/PriorityArrow';
import moment from 'moment';
import { Alarm } from '@material-ui/icons';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  issue: {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    reporter: IUser;
    asignees: IUser[];
    estimatedTime: number;
    timeSpent: number;
    timeRemaining: number;
    createdAt: string;
    updatedAt: string;
  };
}

const IssueDetail = ({ issue }: IProps) => {
  const classes = useIssueDetail();

  const [timeProgress, setTimeProgress] = useState<number>(0);
  useEffect(() => {
    let timeValue: number = 0;
    if (issue.timeSpent && issue.timeRemaining) {
      timeValue =
        (issue.timeSpent * 100) / (issue.timeRemaining + issue.timeSpent);
    } else if (issue.timeSpent && issue.estimatedTime) {
      timeValue =
        (issue.timeSpent * 100) / (issue.estimatedTime + issue.timeSpent);
    } else if (issue.timeSpent) {
      timeValue = 100;
    }
    setTimeProgress(timeValue);
  }, [issue.timeSpent, issue.timeRemaining, issue.estimatedTime]);

  return (
    <Grid container>
      <Grid item sm={8} className={classes.col1}>
        <Typography variant="h5" component="h1" color="initial">
          {issue.name}
        </Typography>
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(issue.description),
          }}
        />
      </Grid>
      <Grid item sm={4} className={classes.col2}>
        <Typography
          variant="overline"
          component="p"
          className={classes.sidebarText}
        >
          <span className={classes.helperText}>Status:</span>
          {issue.status}
        </Typography>
        <Typography
          variant="overline"
          component="p"
          className={classes.sidebarText}
        >
          <span className={classes.helperText}>Priority:</span>
          <PriorityArrow option={issue.priority} />
        </Typography>
        <Typography
          variant="overline"
          component="div"
          className={classes.sidebarText}
        >
          <span className={classes.helperText}>Reporter:</span>
          <Chip
            label={`${issue.reporter.firstName} ${issue.reporter.lastName}`}
            size="small"
            className={classes.chip}
            color="primary"
            avatar={
              <Avatar>
                {issue.reporter.firstName[0]}
                {issue.reporter.lastName[0]}
              </Avatar>
            }
          />
        </Typography>
        <Typography
          variant="overline"
          component="div"
          className={classes.sidebarText}
        >
          <span className={classes.helperText}>Asignees:</span>
          {issue.asignees.length === 0 && 'None'}
          {issue.asignees.map((asignee: IUser) => (
            <Chip
              key={asignee.id}
              label={`${asignee.firstName} ${asignee.lastName}`}
              size="small"
              className={classes.chip}
              avatar={
                <Avatar>
                  {asignee.firstName[0]}
                  {asignee.lastName[0]}
                </Avatar>
              }
            />
          ))}
        </Typography>
        <Typography
          variant="overline"
          component="p"
          className={classes.sidebarText}
        >
          <span className={classes.helperText}>
            Original estimated (hours):
          </span>
          {issue.estimatedTime ? (
            <span className={classes.timeNumber}>{issue.estimatedTime}</span>
          ) : (
            'None'
          )}
        </Typography>
        <Typography variant="overline" component="p">
          <span className={classes.helperText}>Time tracking:</span>
        </Typography>

        <div className={classes.timeTrackerWrapper}>
          <Alarm />
          <div className={classes.progressWrapper}>
            <LinearProgress
              className={classes.progress}
              variant="determinate"
              value={timeProgress}
            />
            <div className={classes.progressValues}>
              <span className={classes.timeNumber}>
                {issue.timeSpent ? (
                  <>{issue.timeSpent}h logged</>
                ) : (
                  'No time logged'
                )}
              </span>
              <span className={classes.timeNumber}>
                {issue.timeRemaining && <>{issue.timeRemaining}h remaining</>}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.line}>
          <Typography variant="caption" component="p">
            <span className={classes.helperText}>
              Created at {moment(issue.createdAt).fromNow(true)} ago
            </span>
          </Typography>
          <Typography variant="caption" component="p">
            <span className={classes.helperText}>
              Updated at {moment(issue.updatedAt).fromNow(true)} ago
            </span>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default IssueDetail;

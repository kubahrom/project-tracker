import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIssueDetailStyles } from '../../styles/muiStyles';
import DOMPurify from 'dompurify';
import PriorityArrow from '../../components/Other/PriorityArrow';
import moment from 'moment';
import TimeTrackerWrapper from '../../components/Modals/TimeTrackerWrapper';
import CommentsWrapper, {
  IComment,
} from '../../components/Comments/CommentsWrapper';

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
    type: string;
    priority: string;
    reporter: IUser;
    asignees: IUser[];
    estimatedTime: number;
    timeSpent: number;
    timeRemaining: number;
    createdAt: string;
    updatedAt: string;
    comments: IComment[];
  };
}

const IssueDetail = ({ issue }: IProps) => {
  const classes = useIssueDetailStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item sm={8} className={classes.body}>
        <Typography variant="h5" component="h1" color="initial">
          {issue.name}
        </Typography>
        {issue.description && (
          <div
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(issue.description),
            }}
          />
        )}
        <CommentsWrapper comments={issue.comments} />
      </Grid>
      <Grid item sm={4}>
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
        <TimeTrackerWrapper
          estimatedTime={issue.estimatedTime}
          timeSpent={issue.timeSpent}
          timeRemaining={issue.timeRemaining}
        />
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

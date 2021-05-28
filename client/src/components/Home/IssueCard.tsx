import { Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { useYourIssuesStyle } from '../../styles/muiStyles';
import IssueType from '../Other/IssueType';
import PriorityArrow from '../Other/PriorityArrow';
import { IHomeIssue } from './YourIssues';

interface IPropsIssueCard {
  issue: IHomeIssue;
}

const IssueCard = ({ issue }: IPropsIssueCard) => {
  const classes = useYourIssuesStyle();
  const { user } = useContext(AuthContext);
  return (
    <Grid item xs={12} sm={6} xl={4} className={classes.card}>
      <Link to={`/project/${issue.project.id}/issue/${issue.id}`}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h3">
            {issue.name}
          </Typography>
          <Typography variant="overline" component="p" color="textSecondary">
            {issue.project.name}
          </Typography>
          <div className={classes.cardContent}>
            <div className={classes.col}>
              <Typography>
                <span className={classes.helperText}>Your role: </span>
                {issue.author.id === user?.id ? (
                  'Author'
                ) : (
                  <>{issue.reporter.id === user?.id ? 'Reporter' : 'Asignee'}</>
                )}
              </Typography>
              <Typography>
                <span className={classes.helperText}>Status: </span>
                {issue.status}
              </Typography>
            </div>
            <div className={classes.col}>
              <IssueType type={issue.type} />
              <PriorityArrow option={issue.priority} />
            </div>
          </div>
          <Typography
            variant="caption"
            component="p"
            color="textSecondary"
            align="right"
          >
            {`Updated ${moment(issue.updatedAt).fromNow(true)} ago`}
          </Typography>
        </Paper>
      </Link>
    </Grid>
  );
};

export default IssueCard;

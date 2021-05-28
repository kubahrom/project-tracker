import { ApolloError, useQuery } from '@apollo/client';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { GET_ISSUES_BY_ID } from '../../graphql/issuesQuery';
import { useYourIssuesStyle } from '../../styles/muiStyles';
import IssueCard from './IssueCard';

export interface IHomeIssue {
  id: string;
  name: string;
  updatedAt: string;
  priority: string;
  status: string;
  type: string;
  project: {
    id: string;
    name: string;
  };
  author: {
    id: string;
  };
  reporter: {
    id: string;
  };
  asignees: {
    id: string;
  };
}

interface IIssuesQuery {
  getIssuesByUserId: IHomeIssue[];
}

const YourIssues = () => {
  const classes = useYourIssuesStyle();
  const { data: { getIssuesByUserId: issues } = {}, loading } =
    useQuery<IIssuesQuery>(GET_ISSUES_BY_ID, {
      onError(err: ApolloError) {
        console.log(err);
      },
    });
  return (
    <Grid item xs={12}>
      <Typography variant="h5" component="h1" className={classes.title}>
        Your Issues
      </Typography>
      <Paper className={classes.paperWrapper}>
        {/* TODO: filter based on role etc... */}
        <Typography variant="h6" color="textSecondary">
          Filter
        </Typography>
        <div className={classes.issuesWrapper}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container>
              {issues?.map((issue: IHomeIssue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </Grid>
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default YourIssues;

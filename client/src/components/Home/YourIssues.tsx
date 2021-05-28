import { ApolloError, useLazyQuery } from '@apollo/client';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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

export interface IHomeIssuesQuery {
  getIssuesByUserId: IHomeIssue[];
}

const YourIssues = () => {
  const classes = useYourIssuesStyle();
  const [isMounted, setMounted] = useState(true);
  const [getIssues, { data, loading }] = useLazyQuery<IHomeIssuesQuery>(
    GET_ISSUES_BY_ID,
    {
      onError(err: ApolloError) {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if (isMounted && !Boolean(data)) {
      getIssues();
    }
    return () => {
      setMounted(false);
    };
  }, [isMounted, data, getIssues]);

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
              {data?.getIssuesByUserId?.map((issue: IHomeIssue) => (
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

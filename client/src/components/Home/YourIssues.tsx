import { ApolloError, useLazyQuery } from '@apollo/client';
import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GET_ISSUES_BY_ID } from '../../graphql/issuesQuery';
import { useYourIssuesStyles } from '../../styles/muiStyles';
import IssuesFilter from './IssuesFilter';
import IssuesList from './IssuesList';

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
  asignees: [
    {
      id: string;
    }
  ];
}

export interface IFilterBy {
  type: string;
  value: string;
}

export interface IHomeIssuesQuery {
  getIssuesByUserId: IHomeIssue[];
}

const YourIssues = () => {
  const classes = useYourIssuesStyles();
  const [isMounted, setMounted] = useState(true);
  const [filterBy, setFilterBy] = useState<IFilterBy>({ type: '', value: '' });
  const [sortBy, setSortBy] = useState<string>('');
  const [getIssues, { data, loading }] = useLazyQuery<IHomeIssuesQuery>(
    GET_ISSUES_BY_ID,
    {
      onError(err: ApolloError) {
        console.log(err);
      },
    }
  );

  const resetFilter = () => {
    setFilterBy({ type: '', value: '' });
    setSortBy('');
  };

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
      <Typography variant="h5" component="h2" className={classes.title}>
        Your Issues
      </Typography>
      <Paper className={classes.paperWrapper}>
        <IssuesFilter
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilter={resetFilter}
        />
        <IssuesList
          loading={loading}
          issues={data?.getIssuesByUserId ? data.getIssuesByUserId : []}
          sortBy={sortBy}
          filterBy={filterBy}
          resetFilter={resetFilter}
        />
      </Paper>
    </Grid>
  );
};

export default YourIssues;

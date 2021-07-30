import React, { useEffect } from 'react';
import { useYourIssuesStyles } from '../../styles/muiStyles';
import { CircularProgress, Grid } from '@material-ui/core';
import IssueCard from './IssueCard';
import { IFilterBy, IHomeIssue } from './YourIssues';
import { useState } from 'react';
import { filterYourIssues, sortYourIssues } from '../../utils/filterYourIssues';
import NoneIssue from './NoneIssue';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

interface IIssuesListProps {
  loading: boolean;
  issues: IHomeIssue[];
  filterBy: IFilterBy;
  sortBy: string;
  resetFilter: () => void;
}

const IssuesList = ({
  loading,
  issues,
  filterBy,
  sortBy,
  resetFilter,
}: IIssuesListProps) => {
  const classes = useYourIssuesStyles();
  const [filteredIssues, setFilteredIssues] = useState<IHomeIssue[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (Boolean(filterBy.value) && sortBy) {
      setFilteredIssues(
        sortYourIssues(filterYourIssues(issues, filterBy, user), sortBy)
      );
    } else if (sortBy) {
      setFilteredIssues(sortYourIssues(issues, sortBy));
    } else if (Boolean(filterBy.value)) {
      setFilteredIssues(filterYourIssues(issues, filterBy, user));
    } else {
      setFilteredIssues(issues);
    }
    filterYourIssues(issues, filterBy, user);
  }, [issues, filterBy, sortBy, user]);
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container className={classes.issuesWrapper}>
          {issues.length === 0 && <NoneIssue />}
          {filteredIssues.length === 0 && issues.length !== 0 && (
            <NoneIssue resetFilter={resetFilter} />
          )}
          {filteredIssues?.map((issue: IHomeIssue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default IssuesList;

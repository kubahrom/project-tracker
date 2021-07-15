import React, { useEffect } from 'react'
import { useYourIssuesStyle } from '../../styles/muiStyles'
import { CircularProgress, Grid } from '@material-ui/core';
import IssueCard from './IssueCard';
import { IFilterBy, IHomeIssue } from './YourIssues';
import { useState } from 'react';
import { filterYourIssues, sortYourIssues } from '../../utils/filterYourIssues';

interface IIssuesListProps {
    loading: boolean;
    issues: IHomeIssue[]
    filterBy: IFilterBy;
    sortBy: string;
}

const IssuesList = ({ loading, issues, filterBy, sortBy }: IIssuesListProps) => {
    const classes = useYourIssuesStyle();
    const [filteredIssues, setFilteredIssues] = useState<IHomeIssue[]>([]);

    useEffect(() => {
        if(Boolean(filterBy.value) && sortBy) {
            setFilteredIssues(sortYourIssues(filterYourIssues(issues, filterBy), sortBy));
        } else if(sortBy) {
            setFilteredIssues(sortYourIssues(issues, sortBy));
        } else if(Boolean(filterBy.value)) {
            setFilteredIssues(filterYourIssues(issues, filterBy));
        } else {
            setFilteredIssues(issues);
        }

    filterYourIssues(issues, filterBy);
    }, [issues, filterBy, sortBy])

    return (
        <div >
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container className={classes.issuesWrapper}>
                    {filteredIssues?.map((issue: IHomeIssue) => (
                        <IssueCard key={issue.id} issue={issue} />
                    ))}
                </Grid>
            )}
        </div>
    )
}

export default IssuesList

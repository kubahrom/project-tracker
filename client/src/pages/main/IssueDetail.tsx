import { ApolloError, gql, useApolloClient, useQuery } from '@apollo/client';
import { CircularProgress, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { GET_ISSUE } from '../../graphql/issuesQuery';
import { useIssueModalStyle } from '../../styles/muiStyles';
import UpdateIssueDetail from './UpdateIssueDetail';

const IssueDetail = () => {
  const classes = useIssueModalStyle();
  const { issueState } = useContext(IssueContext);
  const { sidebarState } = useContext(ProjectContext);
  const client = useApolloClient();

  const cachedIssue = client.readFragment({
    id: `Issue:${issueState.issueId}`,
    fragment: gql`
      fragment IssueDetailPart on Issue {
        id
        name
        status
        priority
        reporter {
          id
          firstName
          lastName
        }
        estimatedTime
        # FIXME: add another fields based on need
      }
    `,
  });

  const { loading } = useQuery(GET_ISSUE, {
    onError(err: ApolloError) {
      console.log(err);
    },
    variables: {
      issueId: issueState.issueId,
      projectId: sidebarState.currProject,
    },
    skip: Boolean(cachedIssue),
  });

  return (
    <div className={classes.modalWrapper}>
      <Typography variant="h4" component="h1">
        Issue detail
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <UpdateIssueDetail issue={cachedIssue} />
      )}
    </div>
  );
};

export default IssueDetail;

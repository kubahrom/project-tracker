import { ApolloError, gql, useApolloClient, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React, { useContext } from 'react';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { GET_ISSUE } from '../../graphql/issuesQuery';
import { useIssueModalStyle } from '../../styles/muiStyles';
import IssueDetail from './IssueDetail';
import UpdateIssueDetail from './UpdateIssueDetail';

const IssueDetailController = () => {
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
        description
        status
        priority
        reporter {
          id
          firstName
          lastName
        }
        asignees {
          id
          firstName
          lastName
        }
        estimatedTime
        timeSpent
        timeRemaining
        createdAt
        updatedAt
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
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {false && <IssueDetail issue={cachedIssue} />}
          {true && <UpdateIssueDetail issue={cachedIssue} />}
        </>
      )}
    </div>
  );
};

export default IssueDetailController;

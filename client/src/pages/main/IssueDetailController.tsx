import { ApolloError, gql, useApolloClient, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React, { useContext } from 'react';
import IssueModalHeader from '../../components/Modals/IssueModalHeader';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { GET_ISSUE } from '../../graphql/issuesQuery';
import { useIssueModalStyle } from '../../styles/muiStyles';
import IssueDetail from './IssueDetail';
import UpdateIssueDetail from './UpdateIssueDetail';

interface IProps {
  handleModalClose: () => void;
}

const IssueDetailController = ({ handleModalClose }: IProps) => {
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
        author {
          id
          firstName
          lastName
        }
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
        type
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
          <IssueModalHeader
            id={cachedIssue.id}
            type={cachedIssue.type}
            handleModalClose={handleModalClose}
            author={cachedIssue.author}
            reporter={cachedIssue.reporter}
          />
          {issueState.updateIssue ? (
            <UpdateIssueDetail issue={cachedIssue} />
          ) : (
            <IssueDetail issue={cachedIssue} />
          )}
        </>
      )}
    </div>
  );
};

export default IssueDetailController;

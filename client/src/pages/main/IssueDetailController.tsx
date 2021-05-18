import { ApolloError, useQuery } from '@apollo/client';
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

  const { data, loading } = useQuery(GET_ISSUE, {
    onError(err: ApolloError) {
      console.log(err);
    },
    variables: {
      issueId: issueState.issueId,
      projectId: sidebarState.currProject,
    },
  });

  return (
    <div className={classes.modalWrapper}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <IssueModalHeader
            id={data.getIssue.id}
            type={data.getIssue.type}
            handleModalClose={handleModalClose}
            author={data.getIssue.author}
            reporter={data.getIssue.reporter}
          />
          {issueState.updateIssue ? (
            <UpdateIssueDetail issue={data.getIssue} />
          ) : (
            <IssueDetail issue={data.getIssue} />
          )}
        </>
      )}
    </div>
  );
};

export default IssueDetailController;

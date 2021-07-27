import { ApolloError, useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import IssueModalHeader from '../../components/Modals/IssueModalHeader';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { GET_ISSUE } from '../../graphql/issuesQuery';
import { useIssueModalStyles } from '../../styles/muiStyles';
import IssueDetail from './IssueDetail';
import UpdateIssueDetail from './UpdateIssueDetail';

interface IProps {
  handleModalClose: () => void;
}

const IssueDetailController = ({ handleModalClose }: IProps) => {
  const classes = useIssueModalStyles();
  const { issueState } = useContext(IssueContext);
  const { sidebarState } = useContext(ProjectContext);

  const [getIssue, { data, loading }] = useLazyQuery(GET_ISSUE, {
    onError(err: ApolloError) {
      console.log(err);
    },
    variables: {
      issueId: issueState.issueId,
      projectId: sidebarState.currProject,
    },
  });

  const [isMounted, setMounted] = useState(true);
  useEffect(() => {
    if (isMounted) {
      getIssue();
    }
    return () => {
      setMounted(false);
    };
  }, [getIssue, isMounted]);

  return (
    <div className={classes.modalWrapper}>
      {loading ? (
        <CircularProgress />
      ) : (
        data?.getIssue && (
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
        )
      )}
    </div>
  );
};

export default IssueDetailController;

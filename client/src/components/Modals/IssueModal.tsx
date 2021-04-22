import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import CreateIssue from '../../pages/main/CreateIssue';
import IssueDetail from '../../pages/main/IssueDetail';

const IssueModal = () => {
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('xs'));

  const { issueState, setIssueState } = useContext(IssueContext);
  const { sidebarState } = useContext(ProjectContext);

  const location = useLocation();
  const history = useHistory();

  const handleModalClose = () => {
    console.log('Before', issueState.issueId);
    if (!issueState.issueId) {
      console.log('create');
      const previousLink = location.pathname.replace('/create-issue', '');
      history.push(previousLink);
      setIssueState({ open: false, issueId: '' });
    } else {
      console.log('update');
      history.push(`/project/${sidebarState.currProject}`);
      setIssueState({ ...issueState, open: false });
    }
  };
  return (
    <Dialog
      fullScreen={fullscreen}
      open={issueState.open}
      onClose={handleModalClose}
    >
      {issueState.issueId ? <IssueDetail /> : <CreateIssue />}
    </Dialog>
  );
};

export default IssueModal;

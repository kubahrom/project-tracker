import { Dialog, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import CreateIssue from '../../pages/main/CreateIssue';
import IssueDetail from '../../pages/main/IssueDetail';

const useStyles = makeStyles(theme => ({
  toolbar: {
    [theme.breakpoints.only('xs')]: theme.mixins.toolbar,
  },
}));

const IssueModal = () => {
  const classes = useStyles();
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('xs'));

  const { issueState, setIssueState } = useContext(IssueContext);
  const { sidebarState } = useContext(ProjectContext);

  const location = useLocation();
  const history = useHistory();

  const handleModalClose = () => {
    if (!issueState.issueId) {
      const previousLink = location.pathname.replace('/create-issue', '');
      history.push(previousLink);
      setIssueState({ open: false, issueId: '' });
    } else {
      history.push(`/project/${sidebarState.currProject}`);
      setIssueState({ ...issueState, open: false });
    }
  };
  return (
    <Dialog
      fullScreen={fullscreen}
      open={issueState.open}
      onClose={handleModalClose}
      fullWidth
      maxWidth="md"
    >
      <div className={classes.toolbar} />
      {issueState.issueId ? (
        <IssueDetail />
      ) : (
        <CreateIssue handleModalClose={handleModalClose} />
      )}
    </Dialog>
  );
};

export default IssueModal;

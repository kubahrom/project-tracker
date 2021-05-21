import { Button, Grid, Tooltip, Typography } from '@material-ui/core';
import { Edit, Link, Redo } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { useIssueHeaderStyle } from '../../styles/muiStyles';
import DeleteBtn from '../Forms/DeleteBtn';
import IssueType from '../Other/IssueType';
import CloseModalBtn from './CloseModalBtn';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  id: string;
  type: string;
  author: IUser;
  reporter: IUser;
  handleModalClose: () => void;
}

const IssueModalHeader = ({
  id,
  type,
  handleModalClose,
  author,
  reporter,
}: IProps) => {
  const classes = useIssueHeaderStyle();
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const { sidebarState } = useContext(ProjectContext);
  const { user: currentUser } = useContext(AuthContext);
  const { issueState, setIssueState } = useContext(IssueContext);

  const handleCopyLinkClick = () => {
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
    navigator?.clipboard.writeText(window.location.href);
  };

  const handleUpdateIssueClick = () => {
    setIssueState({ ...issueState, updateIssue: true });
  };

  const handleCancelUpdateIssueClick = () => {
    setIssueState({ ...issueState, updateIssue: false });
  };

  return (
    <Grid item sm={12}>
      <div className={classes.headerWrapper}>
        <Typography variant="body1" className={classes.helperText}>
          <IssueType type={type} text={issueState.updateIssue ? 'Edit' : ''} />{' '}
          <span className={classes.id}>
            <span className={classes.dash}>- </span>
            {id}
          </span>
        </Typography>
        <div className={classes.headerActions}>
          {author.id === currentUser?.id || reporter.id === currentUser?.id ? (
            <>
              {issueState.updateIssue ? (
                <Tooltip title="Cancel edit issue" arrow>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.btn}
                    onClick={handleCancelUpdateIssueClick}
                  >
                    <Redo />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Edit issue" arrow>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.btn}
                    onClick={handleUpdateIssueClick}
                  >
                    <Edit />
                  </Button>
                </Tooltip>
              )}
            </>
          ) : (
            ''
          )}
          <Tooltip title={isLinkCopied ? 'Link copied' : 'Copy link'} arrow>
            <Button
              variant="outlined"
              aria-label="copy link"
              size="small"
              className={classes.btn}
              onClick={handleCopyLinkClick}
            >
              <Link />
            </Button>
          </Tooltip>
          {author.id === currentUser?.id || reporter.id === currentUser?.id ? (
            <DeleteBtn
              issueId={id}
              projectId={
                sidebarState.currProject ? sidebarState.currProject : ''
              }
            />
          ) : (
            ''
          )}
          <CloseModalBtn handleClose={handleModalClose} />
        </div>
      </div>
    </Grid>
  );
};

export default IssueModalHeader;

import { Button, Grid, Tooltip, Typography } from '@material-ui/core';
import { Delete, Edit, Link } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { useIssueHeaderStyle } from '../../styles/muiStyles';
import IssueType from '../Other/IssueType';

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
  const { user: currentUser } = useContext(AuthContext);

  const handleCopyLinkClick = () => {
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
    navigator.clipboard.writeText(window.location.href);
    console.log(navigator.clipboard);
  };

  return (
    <Grid item sm={12}>
      <div className={classes.headerWrapper}>
        <Typography variant="body1" className={classes.helperText}>
          <IssueType type={type} /> <span className={classes.id}>- {id}</span>
        </Typography>
        <div>
          {author.id === currentUser?.id || reporter.id === currentUser?.id ? (
            <>
              <Tooltip title="Edit issue" arrow>
                <Button variant="outlined" size="small" className={classes.btn}>
                  <Edit />
                </Button>
              </Tooltip>
              <Tooltip title="Delete issue" arrow>
                <Button variant="outlined" size="small" className={classes.btn}>
                  <Delete />
                </Button>
              </Tooltip>
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
          <Tooltip title="Close window" arrow>
            <Button
              variant="outlined"
              size="small"
              aria-label="close modal"
              className={classes.btn}
              onClick={handleModalClose}
            >
              <CloseIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Grid>
  );
};

export default IssueModalHeader;

import { ApolloError, useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { DELETE_COMMENT } from '../../graphql/commentMutation';
import { useDeleteBtnStyles } from '../../styles/muiStyles';

interface IProps {
  commentId: string;
  commentBody: string;
}

const DeleteComment = ({ commentId, commentBody }: IProps) => {
  const classes = useDeleteBtnStyles();
  const [open, setOpen] = useState<boolean>(false);
  const { sidebarState } = useContext(ProjectContext);
  const { issueState } = useContext(IssueContext);

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    onError(err: ApolloError) {
      console.log(err);
    },
    variables: {
      issueId: issueState.issueId,
      projectId: sidebarState.currProject,
      commentId,
    },
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleDeleteProject = () => {
    setOpen(false);
    deleteComment();
  };

  return (
    <>
      <Link onClick={handleClick} className={classes.link}>
        Delete
      </Link>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className={classes.dialogTitle}>
          Are you sure you want to delete this comment:
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {commentBody}
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogActionsWrapper}>
            <Button variant="outlined" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.actionBtn}
              onClick={handleDeleteProject}
              disabled={loading}
            >
              Delete comment
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteComment;

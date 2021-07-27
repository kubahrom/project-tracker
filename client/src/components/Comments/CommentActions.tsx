import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useCommentStyles } from '../../styles/muiStyles';
import DeleteComment from './DeleteComment';

interface IProps {
  commentId: string;
  commentBody: string;
  updateComment: () => void;
}

const CommentActions = ({ commentId, commentBody, updateComment }: IProps) => {
  const classes = useCommentStyles();

  const handleEditClick = () => {
    updateComment();
  };
  return (
    <Typography
      variant="caption"
      component="p"
      className={classes.commentAction}
    >
      <Link onClick={handleEditClick} className={classes.action}>
        Edit
      </Link>
      <DeleteComment commentId={commentId} commentBody={commentBody} />
    </Typography>
  );
};

export default CommentActions;

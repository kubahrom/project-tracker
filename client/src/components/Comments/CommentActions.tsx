import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useCommentStyle } from '../../styles/muiStyles';
import DeleteComment from './DeleteComment';

interface IProps {
  commentId: string;
  commentBody: string;
}

const CommentActions = ({ commentId, commentBody }: IProps) => {
  const classes = useCommentStyle();

  const handleEditClick = () => {
    //TODO: Edit comment
    console.log(`Edit comment ${commentId} clicked.`);
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

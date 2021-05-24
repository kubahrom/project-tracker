import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { useCommentStyle } from '../../styles/muiStyles';
import UserAvatar from '../Other/UserAvatar';
import CommentActions from './CommentActions';
import CommentHeader from './CommentHeader';
import { IComment } from './CommentsWrapper';

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  const classes = useCommentStyle();
  const { user } = useContext(AuthContext);
  return (
    <div className={classes.commentWrapper}>
      <div>
        <UserAvatar user={comment.author} />
      </div>
      <div>
        <CommentHeader author={comment.author} createdAt={comment.createdAt} />
        <Typography variant="body1" component="p">
          {comment.body}
        </Typography>
        {comment.author.id === user?.id && (
          <CommentActions commentId={comment.id} commentBody={comment.body} />
        )}
      </div>
    </div>
  );
};

export default Comment;

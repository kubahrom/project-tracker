import { Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { useCommentStyles } from '../../styles/muiStyles';
import UserAvatar from '../Other/UserAvatar';
import AddComment from './AddComment';
import CommentActions from './CommentActions';
import CommentHeader from './CommentHeader';
import { IComment } from './CommentsWrapper';

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  const classes = useCommentStyles();
  const { user } = useContext(AuthContext);
  const [updateComment, setUpdateComment] = useState<boolean>(false);

  const updateCommentHandle = () => {
    setUpdateComment(true);
  };

  const cancelUpdateCommentHandle = () => {
    setUpdateComment(false);
  };
  return (
    <div className={classes.commentWrapper}>
      <div>
        <UserAvatar user={comment.author} />
      </div>
      <div>
        {updateComment ? (
          <AddComment
            commentId={comment.id}
            commentBody={comment.body}
            unsetNewComment={cancelUpdateCommentHandle}
          />
        ) : (
          <>
            <CommentHeader
              author={comment.author}
              createdAt={comment.createdAt}
              updated={comment.updated}
            />
            <Typography variant="body1" component="p">
              {comment.body}
            </Typography>
            {comment.author.id === user?.id && (
              <CommentActions
                commentId={comment.id}
                commentBody={comment.body}
                updateComment={updateCommentHandle}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;

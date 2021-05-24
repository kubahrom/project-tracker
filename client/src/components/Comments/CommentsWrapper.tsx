import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useCommentStyle } from '../../styles/muiStyles';
import AddComment from './AddComment';
import Comment from './Comment';

export interface IComment {
  id: string;
  body: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface IProps {
  comments: IComment[];
}

const CommentsWrapper = ({ comments }: IProps) => {
  const classes = useCommentStyle();
  const [sortedComments, setSortedComments] = useState<IComment[]>([]);
  const [newCommentInput, setNewCommentInput] = useState<boolean>(false);

  const handleNewCommentClick = () => {
    setNewCommentInput(true);
  };
  const handlNewCommentClickCancel = () => {
    setNewCommentInput(false);
  };

  useEffect(() => {
    setSortedComments(
      [...comments].sort((a: IComment, b: IComment) => {
        if (a.createdAt > b.createdAt) return -1;
        return 1;
      })
    );
  }, [comments]);
  return (
    <div className={classes.commentsSection}>
      {newCommentInput ? (
        <AddComment unsetNewComment={handlNewCommentClickCancel} />
      ) : (
        <div onClick={handleNewCommentClick} className={classes.newComment}>
          <Typography variant="body1">Add a comment...</Typography>
        </div>
      )}
      <div className={classes.commentsWrapper}>
        {sortedComments.map((comment: IComment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsWrapper;

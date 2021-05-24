import { Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useCommentStyle } from '../../styles/muiStyles';

interface IProps {
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

const CommentHeader = ({ author, createdAt }: IProps) => {
  const classes = useCommentStyle();
  return (
    <div>
      <Typography variant="subtitle1" component="p">
        {author.firstName} {author.lastName}{' '}
        <span className={classes.helperText}>
          {moment(createdAt).fromNow(true)} ago
        </span>
      </Typography>
    </div>
  );
};

export default CommentHeader;

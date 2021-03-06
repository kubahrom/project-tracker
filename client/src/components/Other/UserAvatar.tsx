import { Avatar } from '@material-ui/core';
import React from 'react';
import { useCommentStyles } from '../../styles/muiStyles';

interface IProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const UserAvatar = ({ user }: IProps) => {
  const classes = useCommentStyles();
  return (
    <Avatar className={classes.avatar}>
      {user.firstName[0]}
      {user.lastName[0]}
    </Avatar>
  );
};

export default UserAvatar;

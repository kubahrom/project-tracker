import { Avatar, makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { AvatarGroup } from '@material-ui/lab';
import clsx from 'clsx';
import React from 'react';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  asignees: IUser[];
}

const useAvatarGroupStyles = makeStyles(
  theme => ({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: theme.typography.subtitle2.fontSize,
    },
    indigo1: {
      backgroundColor: indigo[100],
    },
    indigo2: {
      backgroundColor: indigo[200],
    },
    indigo3: {
      backgroundColor: indigo[300],
    },
    indigo4: {
      backgroundColor: indigo[400],
    },
  }),
  { index: 1 }
);

const BoardIssueAvatars = ({ asignees }: IProps) => {
  const classes = useAvatarGroupStyles();
  let classNameHolder = [
    classes.indigo3,
    classes.indigo4,
    classes.indigo2,
    classes.indigo1,
  ];
  return (
    <AvatarGroup max={3}>
      {asignees.map((asignee: IUser, index) => (
        <Avatar
          key={asignee.id}
          className={clsx(classes.small, classNameHolder[index])}
        >
          {asignee.firstName[0]}
          {asignee.lastName[0]}
        </Avatar>
      ))}
    </AvatarGroup>
  );
};

export default BoardIssueAvatars;

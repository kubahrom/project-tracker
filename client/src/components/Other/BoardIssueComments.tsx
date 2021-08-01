import { Badge, makeStyles } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(
  theme => ({
    badge: { marginTop: 0 },
    customBadge: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  }),
  { index: 1 }
);

interface IProps {
  commentCount: number;
}

const BoardIssueComments = ({ commentCount }: IProps) => {
  const classes = useStyles();
  return (
    <Badge
      badgeContent={commentCount}
      color="primary"
      className={classes.badge}
      classes={{ badge: classes.customBadge }}
    >
      <Chat fontSize="small" color="inherit" />
    </Badge>
  );
};

export default BoardIssueComments;

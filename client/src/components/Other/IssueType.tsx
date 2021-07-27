import { Bookmark, CheckBox, Error } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { useIssueTypeStyles } from '../../styles/muiStyles';

interface IProps {
  type: string;
  board?: boolean;
  text?: string;
}

const IssueType = ({ type, board, text }: IProps) => {
  const classes = useIssueTypeStyles();
  return (
    <span className={classes.iconWrapper}>
      {type === 'Task' && (
        <CheckBox
          fontSize="small"
          className={clsx(!board && classes.icon, classes.task)}
        />
      )}
      {type === 'Bug' && (
        <Error
          fontSize="small"
          className={clsx(!board && classes.icon, classes.bug)}
        />
      )}
      {type === 'Story' && (
        <Bookmark
          fontSize="small"
          className={clsx(!board && classes.icon, classes.story)}
        />
      )}
      {!board && <span>{text ? `${text} ${type}` : type}</span>}
    </span>
  );
};

export default IssueType;

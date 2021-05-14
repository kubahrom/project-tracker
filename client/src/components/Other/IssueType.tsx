import { Bookmark, CheckBox, Error } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { useIssueTypeStyle } from '../../styles/muiStyles';

interface IProps {
  type: string;
  board?: boolean;
}

const IssueType = ({ type, board }: IProps) => {
  const classes = useIssueTypeStyle();
  return (
    <span className={classes.iconWrapper}>
      {type === 'Task' && (
        <CheckBox className={clsx(!board && classes.icon, classes.task)} />
      )}
      {type === 'Bug' && (
        <Error className={clsx(!board && classes.icon, classes.bug)} />
      )}
      {type === 'Story' && (
        <Bookmark className={clsx(!board && classes.icon, classes.story)} />
      )}
      {!board && <span>{type}</span>}
    </span>
  );
};

export default IssueType;

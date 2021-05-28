import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { usePriorityListStyle } from '../../styles/muiStyles';

interface IProps {
  option: string;
  board?: boolean;
}

const PriorityArrow = ({ option, board }: IProps) => {
  const classes = usePriorityListStyle();
  return (
    <span className={classes.iconWrapper}>
      {option === 'Highest' || option === 'High' ? (
        <ArrowUpward
          fontSize="small"
          className={clsx(
            !board && classes.icon,
            option === 'Highest' ? classes.highest : classes.high
          )}
        />
      ) : (
        <ArrowDownward
          fontSize="small"
          className={clsx(
            !board && classes.icon,
            option === 'Low' ? classes.low : classes.lowest
          )}
        />
      )}
      {!board && <span>{option}</span>}
    </span>
  );
};

export default PriorityArrow;

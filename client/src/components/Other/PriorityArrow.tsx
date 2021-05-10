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
    <>
      {option === 'Highest' || option === 'High' ? (
        <ArrowUpward
          className={clsx(
            classes.icon,
            option === 'Highest' ? classes.highest : classes.high
          )}
        />
      ) : (
        <ArrowDownward
          className={clsx(
            classes.icon,
            option === 'Low' ? classes.low : classes.lowest
          )}
        />
      )}
      {!board && option}
    </>
  );
};

export default PriorityArrow;

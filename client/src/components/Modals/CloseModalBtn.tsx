import { Button, Tooltip } from '@material-ui/core';
import React from 'react';
import { useIssueHeaderStyles } from '../../styles/muiStyles';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  handleClose: () => void;
}

const CloseModalBtn = ({ handleClose }: IProps) => {
  const classes = useIssueHeaderStyles();
  return (
    <Tooltip title="Close window" arrow>
      <Button
        variant="outlined"
        size="small"
        aria-label="close modal"
        className={classes.btn}
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>
    </Tooltip>
  );
};

export default CloseModalBtn;

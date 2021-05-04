import { TextField } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { usePriorityListStyle } from '../../styles/muiStyles';
import { priorityList } from '../../utils/constants';
import clsx from 'clsx';

const IssuePriorityAutoComplete = ({ register, error }: any) => {
  const classes = usePriorityListStyle();
  return (
    <Autocomplete
      id="issue-priority-combo-box"
      options={priorityList}
      getOptionLabel={(option: string) => option}
      renderOption={(option: string) => (
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
          {option}
        </>
      )}
      renderInput={params => (
        <TextField
          {...params}
          {...register('priority', {
            required: 'Priority of the issue is required',
          })}
          label="Priority"
          variant="outlined"
          error={error ? true : false}
          helperText={error ? error.message : ''}
        />
      )}
    />
  );
};

export default IssuePriorityAutoComplete;

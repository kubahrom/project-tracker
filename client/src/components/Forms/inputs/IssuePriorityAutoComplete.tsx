import { TextField } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import React from 'react';
import { usePriorityListStyle } from '../../../styles/muiStyles';
import { priorityList } from '../../../utils/constants';
import clsx from 'clsx';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

type ErrorType = FieldError | undefined;

interface IProps {
  register: UseFormRegister<any>;
  error: ErrorType;
  control?: Control<any>;
}

const IssuePriorityAutoComplete = ({ register, error, control }: IProps) => {
  const classes = usePriorityListStyle();

  const renderRenderOption = (option: string) => (
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
  );

  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label="Priority"
        variant="outlined"
        error={error ? true : false}
        helperText={error ? error.message : ''}
        {...register('priority', {
          required: 'Priority of the issue is required',
        })}
      />
    );
  };

  return (
    <>
      {control ? (
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Autocomplete
              {...field}
              id="issue-priority-combo-box"
              options={priorityList}
              getOptionLabel={(option: string) => option}
              onChange={(_, data) => field.onChange(data)}
              renderOption={(option: string) => renderRenderOption(option)}
              renderInput={params => renderTextField(params)}
            />
          )}
        />
      ) : (
        <Autocomplete
          id="issue-priority-combo-box"
          options={priorityList}
          getOptionLabel={(option: string) => option}
          renderOption={(option: string) => renderRenderOption(option)}
          renderInput={params => renderTextField(params)}
        />
      )}
    </>
  );
};

export default IssuePriorityAutoComplete;

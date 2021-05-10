import { TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import React from 'react';
import { priorityList } from '../../../utils/constants';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import PriorityArrow from '../../Other/PriorityArrow';

type ErrorType = FieldError | undefined;

interface IProps {
  register: UseFormRegister<any>;
  error: ErrorType;
  control?: Control<any>;
}

const IssuePriorityAutoComplete = ({ register, error, control }: IProps) => {
  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        required
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
              renderOption={(option: string) => (
                <PriorityArrow option={option} />
              )}
              renderInput={params => renderTextField(params)}
            />
          )}
        />
      ) : (
        <Autocomplete
          id="issue-priority-combo-box"
          options={priorityList}
          getOptionLabel={(option: string) => option}
          renderOption={(option: string) => <PriorityArrow option={option} />}
          renderInput={params => renderTextField(params)}
        />
      )}
    </>
  );
};

export default IssuePriorityAutoComplete;

import { TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import React from 'react';
import { typeList } from '../../../utils/constants';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import IssueType from '../../Other/IssueType';

type ErrorType = FieldError | undefined;

interface IProps {
  register: UseFormRegister<any>;
  error: ErrorType;
  control?: Control<any>;
}

const IssueTypeAutoComplete = ({ register, error, control }: IProps) => {
  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        required
        label="Type"
        variant="outlined"
        error={error ? true : false}
        helperText={error ? error.message : ''}
        {...register('type', {
          required: 'Type of the issue is required',
        })}
      />
    );
  };

  return (
    <>
      {control ? (
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Autocomplete
              {...field}
              id="issue-type-combo-box"
              options={typeList}
              getOptionLabel={(option: string) => option}
              onChange={(_, data) => field.onChange(data)}
              renderOption={(option: string) => <IssueType type={option} />}
              renderInput={params => renderTextField(params)}
            />
          )}
        />
      ) : (
        <Autocomplete
          id="issue-type-combo-box"
          options={typeList}
          getOptionLabel={(option: string) => option}
          renderOption={(option: string) => <IssueType type={option} />}
          renderInput={params => renderTextField(params)}
        />
      )}
    </>
  );
};

export default IssueTypeAutoComplete;

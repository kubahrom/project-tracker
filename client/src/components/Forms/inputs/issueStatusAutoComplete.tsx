import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { statusList } from '../../../utils/constants';

type ErrorType = FieldError | undefined;

interface IProps {
  control: Control<any>;
  error: ErrorType;
}

const issueStatusAutoComplete = ({ control, error }: IProps) => {
  return (
    <>
      <Controller
        name="status"
        control={control}
        rules={{ required: 'Issue status must not be empty' }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="issue-status-combo-box"
            options={statusList}
            getOptionLabel={(option: string) => option}
            onChange={(_, data) => field.onChange(data)}
            renderInput={params => (
              <TextField
                {...params}
                label="Status"
                variant="outlined"
                error={error ? true : false}
                helperText={error ? error.message : ''}
              />
            )}
          />
        )}
      />
    </>
  );
};

export default issueStatusAutoComplete;

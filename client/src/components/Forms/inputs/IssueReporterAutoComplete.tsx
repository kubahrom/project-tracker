import { TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import React, { useContext } from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import { ProjectContext } from '../../../context/project';
import useGetProjectUsers from '../../../utils/hooks/useGetProjectUsers';

type ErrorType = FieldError | undefined;

interface IProps {
  register: UseFormRegister<any>;
  error: ErrorType;
  control?: Control<any>;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

const IssueReporterAutoComplete = ({ register, error, control }: IProps) => {
  const { sidebarState } = useContext(ProjectContext);
  const projectUsersList = useGetProjectUsers(sidebarState.currProject);
  const projectUsers = projectUsersList.map(
    (user: IUser) => `${user.firstName} ${user.lastName}`
  );

  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label="Reporter"
        variant="outlined"
        error={error ? true : false}
        helperText={error ? error.message : ''}
        {...register('reporter', {
          required: 'Reporter of the issue is required',
        })}
      />
    );
  };

  return (
    <>
      {control ? (
        <Controller
          control={control}
          name="reporter"
          render={({ field }) => (
            <Autocomplete
              {...field}
              id="issue-reporter-combo-box"
              options={projectUsers}
              onChange={(_, data) => field.onChange(data)}
              renderInput={params => renderTextField(params)}
            />
          )}
        />
      ) : (
        <Autocomplete
          id="issue-reporter-combo-box"
          options={projectUsers}
          renderInput={params => renderTextField(params)}
        />
      )}
    </>
  );
};

export default IssueReporterAutoComplete;

import { TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import React, { useContext } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ProjectContext } from '../../../context/project';
import useGetProjectUsers from '../../../utils/hooks/useGetProjectUsers';

// type ErrorType = FieldError | undefined;

interface IProps {
  error: any;
  control?: Control<any>;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

const IssueReporterAutoComplete = ({ error, control }: IProps) => {
  const { sidebarState } = useContext(ProjectContext);
  const projectUsers = useGetProjectUsers(sidebarState.currProject);

  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        required
        label="Reporter"
        variant="outlined"
        error={error ? true : false}
        helperText={error ? error.message : ''}
      />
    );
  };

  return (
    <Controller
      control={control}
      name="reporter"
      rules={{ required: 'Reporter of the issue is required' }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          id="issue-reporter-combo-box"
          options={projectUsers}
          getOptionLabel={(user: IUser) => `${user.firstName} ${user.lastName}`}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(_, data) => field.onChange(data)}
          renderInput={params => renderTextField(params)}
        />
      )}
    />
  );
};

export default IssueReporterAutoComplete;

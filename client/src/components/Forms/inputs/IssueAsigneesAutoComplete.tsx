import { TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import React, { useContext } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ProjectContext } from '../../../context/project';
import useGetProjectUsers from '../../../utils/hooks/useGetProjectUsers';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  control: Control<any>;
}

const IssueAsigneesAutoComplete = ({ control }: IProps) => {
  const { sidebarState } = useContext(ProjectContext);
  const projectUsers = useGetProjectUsers(sidebarState.currProject);

  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label="Asignees"
        placeholder="Add asignee"
        variant="outlined"
      />
    );
  };

  return (
    <Controller
      control={control}
      name="asignees"
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          id="issue-asignees-chips"
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

export default IssueAsigneesAutoComplete;

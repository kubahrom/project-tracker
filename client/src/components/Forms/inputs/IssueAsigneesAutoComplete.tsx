import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useContext } from 'react';
import { ProjectContext } from '../../../context/project';
import useGetProjectUsers from '../../../utils/hooks/useGetProjectUsers';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  setAsignees: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const IssueAsigneesAutoComplete = ({ setAsignees }: IProps) => {
  const { sidebarState } = useContext(ProjectContext);
  const projectUsers = useGetProjectUsers(sidebarState.currProject);
  return (
    <Autocomplete
      multiple
      onChange={(_, values) => setAsignees(values)}
      id="issue-asignees-chips"
      options={projectUsers}
      getOptionLabel={(option: IUser) =>
        `${option.firstName} ${option.lastName}`
      }
      renderInput={params => (
        <TextField
          {...params}
          label="Asignees"
          placeholder="Add asignee"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default IssueAsigneesAutoComplete;

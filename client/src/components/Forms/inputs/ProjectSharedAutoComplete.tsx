import { ApolloError, useQuery } from "@apollo/client";
import { TextField } from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { AuthContext } from "../../../context/auth";
import { GET_USERS } from "../../../graphql/userQuery";
import { IProjectForm } from "../CreateUpdateProject";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProps {
  control: Control<IProjectForm>;
  sharedTo: IUser[];
}

interface IUsers {
  getUsers: IUser[];
}

const ProjectSharedAutoComplete = ({ control, sharedTo }: IProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { user: curUser } = useContext(AuthContext);
  const { data: { getUsers: allUsers } = {} } = useQuery<IUsers>(GET_USERS, {
    onError(err: ApolloError) {
      console.log(err);
    },
  });

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers.filter((user: IUser) => user.id !== curUser?.id));
    }
  }, [allUsers, curUser]);

  const renderTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label="Shared to"
        placeholder="Share to"
        variant="outlined"
      />
    );
  };

  return (
    <Controller
      control={control}
      name="shared"
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          id="project-shared-chips"
          options={users}
          getOptionLabel={(user: IUser) => `${user.firstName} ${user.lastName}`}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(_, data) => field.onChange(data)}
          renderInput={(params) => renderTextField(params)}
        />
      )}
    />
  );
};

export default ProjectSharedAutoComplete;

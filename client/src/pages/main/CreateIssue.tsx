import { AddComment } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@material-ui/core';
import { useIssueModalStyle } from '../../styles/muiStyles';
import { Autocomplete } from '@material-ui/lab';
import { gql, useApolloClient } from '@apollo/client';
import { ProjectContext } from '../../context/project';
import Editor from '../../components/Modals/Editor';

interface ICreateIssueForm {
  name: string;
  reporter: string;
  asignees: string[];
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IcachedProjectUsers {
  author: IUser;
  shared: IUser[];
}

interface IProps {
  handleModalClose: () => void;
}

const CreateIssue = ({ handleModalClose }: IProps) => {
  const classes = useIssueModalStyle();
  const { sidebarState } = useContext(ProjectContext);
  const [projectUsers, setProjectUsers] = useState<IUser[]>([]);
  const [asignees, setAsignees] = useState<IUser[]>([]);
  // const [editor, setEditor] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateIssueForm>();

  const client = useApolloClient();
  const cachedProjectUsers = client.readFragment<IcachedProjectUsers>({
    id: `Project:${sidebarState.currProject}`,
    fragment: gql`
      fragment ProjectUsers on Project {
        author {
          id
          firstName
          lastName
        }
        shared {
          id
          firstName
          lastName
        }
      }
    `,
  });

  const onSubmit = (data: ICreateIssueForm) => {
    console.log(data);
    console.log(asignees);
    // {/* name, description, reporter, asignees, priority */}
    //Find user id by name
    //ReactQuill
    //DOM purify??
  };

  useEffect(() => {
    if (cachedProjectUsers)
      setProjectUsers([
        cachedProjectUsers.author,
        ...cachedProjectUsers.shared,
      ]);
  }, [cachedProjectUsers]);

  return (
    <div className={classes.modalWrapper}>
      <Typography variant="h4" component="h1">
        Create Issue
      </Typography>
      <div className={classes.formWrapper}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              label="Issue name"
              {...register('name', {
                required: 'Name of the issue must not be empty',
              })}
              type="text"
              variant="outlined"
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : ''}
            />
          </div>
          <div className={classes.inputField}>
            <Editor />
          </div>
          <div className={classes.inputField}>
            <Autocomplete
              id="issue-reporter-combo-box"
              options={projectUsers}
              getOptionLabel={(option: IUser) =>
                `${option.firstName} ${option.lastName}`
              }
              renderInput={params => (
                <TextField
                  {...params}
                  {...register('reporter', {
                    required: 'Reporter of the issue is required',
                  })}
                  label="Reporter"
                  variant="outlined"
                  error={errors.reporter ? true : false}
                  helperText={errors.reporter ? errors.reporter.message : ''}
                />
              )}
            />
          </div>
          <div className={classes.inputField}>
            <Autocomplete
              multiple
              onChange={(event, values) => setAsignees(values)}
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
          </div>
          <div className={classes.inputField}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              startIcon={<AddComment />}
              fullWidth
              // disabled={loading}
            >
              Create Issue
            </Button>
          </div>
        </form>
      </div>
      <div className={classes.btnCancel}>
        <Button size="large" variant="outlined" onClick={handleModalClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateIssue;

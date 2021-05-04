import { AddComment } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@material-ui/core';
import { useIssueModalStyle } from '../../styles/muiStyles';
import { Autocomplete } from '@material-ui/lab';
import { ApolloError, gql, useApolloClient, useMutation } from '@apollo/client';
import { ProjectContext } from '../../context/project';
import Editor from '../../components/Modals/Editor';
import { CREATE_ISSUE } from '../../graphql/issuesMutation';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { LexoRank } from 'lexorank';
import IssuePriorityAutoComplete from '../../components/Forms/IssuePriorityAutoComplete';

interface ICreateIssueForm {
  name: string;
  reporter: string;
  asignees: string[];
  priority: string;
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
  const [editor, setEditor] = useState<string>('');
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

  const cachedIssues = client.readQuery({
    query: GET_ISSUES,
    variables: {
      projectId: sidebarState.currProject,
    },
  });
  const previousIndex =
    cachedIssues?.getIssues && cachedIssues.getIssues.length !== 0
      ? cachedIssues.getIssues
          .filter((issue: any) => issue.status === 'backlog')
          .sort((a: any, b: any) => {
            if (a.index > b.index) return 1;
            return -1;
          })[0]?.index
      : '';

  const [createIssue, { loading }] = useMutation(CREATE_ISSUE, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: GET_ISSUES,
        variables: {
          projectId: sidebarState.currProject,
        },
      });
      proxy.writeQuery({
        query: GET_ISSUES,
        variables: {
          projectId: sidebarState.currProject,
        },
        data: { getIssues: [result.data.createIssue, ...data.getIssues] },
      });
      handleModalClose();
    },
    onError(err: ApolloError) {
      console.log(err);
    },
  });
  const onSubmit = (result: ICreateIssueForm) => {
    const data = {
      name: result.name,
      description: editor,
      reporter: projectUsers.filter(
        (user: IUser) =>
          result.reporter === `${user.firstName} ${user.lastName}`
      )[0].id,
      asignees: asignees.map((asignee: IUser) => asignee.id),
      projectId: sidebarState.currProject,
      index:
        previousIndex.length !== 0
          ? LexoRank.parse(previousIndex).genPrev().toString()
          : LexoRank.middle().toString(),
      status: 'backlog',
      priority: result.priority,
    };
    createIssue({ variables: data });
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
            <Editor editor={editor} setEditor={setEditor} />
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
            <IssuePriorityAutoComplete
              register={register}
              error={errors?.priority}
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
              disabled={loading}
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

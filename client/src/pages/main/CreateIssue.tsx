import { AddComment } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@material-ui/core';
import { useIssueModalStyle } from '../../styles/muiStyles';
import { ApolloError, useApolloClient, useMutation } from '@apollo/client';
import { ProjectContext } from '../../context/project';
import Editor from '../../components/Modals/Editor';
import { CREATE_ISSUE } from '../../graphql/issuesMutation';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { LexoRank } from 'lexorank';
import IssuePriorityAutoComplete from '../../components/Forms/inputs/IssuePriorityAutoComplete';
import IssueAsigneesAutoComplete from '../../components/Forms/inputs/IssueAsigneesAutoComplete';
import IssueReporterAutoComplete from '../../components/Forms/inputs/IssueReporterAutoComplete';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface ICreateIssueForm {
  name: string;
  reporter: IUser | null;
  asignees: IUser[];
  priority: string;
}

interface IIssue {
  status: string;
  index: string;
}

interface Issues {
  getIssues: IIssue[];
}

type Issuetype = Issues | null;

interface IProps {
  handleModalClose: () => void;
}

const CreateIssue = ({ handleModalClose }: IProps) => {
  const classes = useIssueModalStyle();
  const { sidebarState } = useContext(ProjectContext);
  const [editor, setEditor] = useState<string>('');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateIssueForm>({
    defaultValues: {
      asignees: [],
      reporter: null,
    },
  });

  const client = useApolloClient();
  const cachedIssues = client.readQuery({
    query: GET_ISSUES,
    variables: {
      projectId: sidebarState.currProject,
    },
  });

  const [createIssue, { loading }] = useMutation(CREATE_ISSUE, {
    update(proxy, result) {
      const data: Issuetype = proxy.readQuery({
        query: GET_ISSUES,
        variables: {
          projectId: sidebarState.currProject,
        },
      });
      if (data)
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
    const previousIndex =
      cachedIssues?.getIssues && cachedIssues.getIssues.length !== 0
        ? cachedIssues.getIssues
            .filter((issue: IIssue) => issue.status === 'backlog')
            .sort((a: IIssue, b: IIssue) => {
              if (a.index > b.index) return 1;
              return -1;
            })[0]?.index
        : '';

    const data = {
      name: result.name,
      description: editor,
      reporter: result.reporter!.id,
      asignees: result.asignees.map((asignee: IUser) => asignee.id),
      projectId: sidebarState.currProject,
      index: previousIndex
        ? LexoRank.parse(previousIndex).genPrev().toString()
        : LexoRank.middle().toString(),
      status: 'backlog',
      priority: result.priority,
    };
    createIssue({ variables: data });
  };

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
            <IssueReporterAutoComplete
              control={control}
              error={errors.reporter}
            />
          </div>
          <div className={classes.inputField}>
            <IssueAsigneesAutoComplete control={control} />
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

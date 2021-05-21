import { Button, TextField } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import IssuePriorityAutoComplete from '../../components/Forms/inputs/IssuePriorityAutoComplete';
import { useUpdateIssueDetailStyle } from '../../styles/muiStyles';
import IssueStatusAutoComplete from '../../components/Forms/inputs/issueStatusAutoComplete';
import IssueAsigneesAutoComplete from '../../components/Forms/inputs/IssueAsigneesAutoComplete';
import IssueReporterAutoComplete from '../../components/Forms/inputs/IssueReporterAutoComplete';
import Editor from '../../components/Modals/Editor';
import IssueTypeAutoComplete from '../../components/Forms/inputs/issueTypeAutoComplete';
import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_ISSUE } from '../../graphql/issuesMutation';
import { ProjectContext } from '../../context/project';
import { IssueContext } from '../../context/issue';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IUpdateIssueForm {
  name: string;
  status: string;
  priority: string;
  type: string;
  reporter: IUser;
  estimatedTime: string;
  timeSpent: string;
  timeRemaining: string;
  asignees: IUser[];
}

interface IProps {
  issue: {
    id: string;
    name: string;
    description: string;
    status: string;
    type: string;
    priority: string;
    reporter: IUser;
    asignees: IUser[];
    estimatedTime: string;
    timeSpent: string;
    timeRemaining: string;
  };
}

const timeValidation = {
  max: {
    value: 999999,
    message: 'Number cannot more than 6 digits long',
  },
  pattern: {
    value: /^[0-9\b]{0,6}$/,
    message: 'Not a number',
  },
};
// Useformhook --- name(textField), status(select 1 opt), priority (select 1 opt),
//                 reporter(select 1 opt), estimatedTime(inputFild),asignees(multiple choice)

//TODO another modal --- timeSpent(inputField), timeRemaining(inputField)

//Additional add --- description(editor),
//FIXME: issue timers return null if empty
//TODO: comments
const UpdateIssueDetail = ({ issue }: IProps) => {
  const classes = useUpdateIssueDetailStyle();

  const [editor, setEditor] = useState<string>(issue.description);
  const { sidebarState } = useContext(ProjectContext);
  const { issueState, setIssueState } = useContext(IssueContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUpdateIssueForm>({
    mode: 'onChange',
    defaultValues: {
      name: issue.name,
      status: issue.status,
      type: issue.type,
      priority: issue.priority,
      reporter: issue.reporter,
      asignees: issue.asignees,
      estimatedTime: issue.estimatedTime ? issue.estimatedTime : '',
      timeSpent: issue.timeSpent ? issue.timeSpent : '',
      timeRemaining: issue.timeRemaining ? issue.timeRemaining : '',
    },
  });

  const [updateIssue, { loading }] = useMutation(UPDATE_ISSUE, {
    onError(err: ApolloError) {
      console.log(err.graphQLErrors);
    },
  });

  const onSubmit = (result: IUpdateIssueForm) => {
    const data = {
      ...result,
      estimatedTime: result.estimatedTime
        ? parseInt(result.estimatedTime)
        : null,
      timeSpent: result.timeSpent ? parseInt(result.timeSpent) : null,
      timeRemaining: result.timeRemaining
        ? parseInt(result.timeRemaining)
        : null,
      description: editor,
      issueId: issue.id,
      projectId: sidebarState.currProject,
      reporter: result.reporter.id,
      asignees: result.asignees.map((asignee: IUser) => asignee.id),
    };
    //FIXME: index if change status
    updateIssue({ variables: data });
    setIssueState({ ...issueState, updateIssue: false });
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.inputField}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Issue name must not be empty' }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Issue name"
                type="text"
                variant="outlined"
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
        </div>
        <div className={classes.inputField}>
          <Editor editor={editor} setEditor={setEditor} />
        </div>
        <div className={classes.inputField}>
          <IssueTypeAutoComplete
            register={register}
            error={errors?.type}
            control={control}
          />
        </div>
        <div className={classes.inputField}>
          <IssueStatusAutoComplete control={control} error={errors?.status} />
        </div>
        <div className={classes.inputField}>
          <IssuePriorityAutoComplete
            register={register}
            error={errors?.priority}
            control={control}
          />
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
        <div className={classes.inputFieldSmallWrapper}>
          <div className={classes.inputFieldSmall}>
            <Controller
              control={control}
              name="estimatedTime"
              rules={timeValidation}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Estimated time"
                  type="text"
                  variant="outlined"
                  error={errors.estimatedTime ? true : false}
                  helperText={
                    errors.estimatedTime ? errors.estimatedTime.message : ''
                  }
                />
              )}
            />
          </div>
          <div className={classes.inputFieldSmall}>
            <Controller
              control={control}
              name="timeSpent"
              rules={timeValidation}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Time spent"
                  type="text"
                  variant="outlined"
                  error={errors.timeSpent ? true : false}
                  helperText={errors.timeSpent ? errors.timeSpent.message : ''}
                />
              )}
            />
          </div>
          <div className={classes.inputFieldSmall}>
            <Controller
              control={control}
              name="timeRemaining"
              rules={timeValidation}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Time remaining"
                  type="text"
                  variant="outlined"
                  error={errors.timeRemaining ? true : false}
                  helperText={
                    errors.timeRemaining ? errors.timeRemaining.message : ''
                  }
                />
              )}
            />
          </div>
        </div>
        <div className={classes.inputField}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            startIcon={<Save />}
            fullWidth
            disabled={loading}
          >
            Save Issue
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateIssueDetail;

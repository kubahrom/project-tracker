import { Button, TextField } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import IssuePriorityAutoComplete from '../../components/Forms/inputs/IssuePriorityAutoComplete';
import { useUpdateIssueDetailStyle } from '../../styles/muiStyles';
import IssueStatusAutoComplete from '../../components/Forms/inputs/issueStatusAutoComplete';
import IssueReporterAutoComplete from '../../components/Forms/inputs/IssueReporterAutoComplete';

interface IUpdateIssueForm {
  name: string;
  status: string;
  priority: string;
  reporter: string;
  estimatedTime: number;
}
// Useformhook --- name(textField), status(select 1 opt), priority (select 1 opt),
//                 reporter(select 1 opt), estimatedTime(inputFild),

//TODO another modal --- timeSpend(inputField), timeRemaining(inputField)

//Additional add --- description(editor), asignees(multiple choice)
//comments

//Auto Change --- createdAt, updatedAt
const UpdateIssueDetail = ({ issue }: any) => {
  const classes = useUpdateIssueDetailStyle();
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
      priority: issue.priority,
      reporter: `${issue.reporter.firstName} ${issue.reporter.lastName}`,
      estimatedTime: issue.estimatedTime ? issue.estimatedTime : 0,
    },
  });

  const onSubmit = (result: IUpdateIssueForm) => {
    console.log(result);
  };

  return (
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
          register={register}
          error={errors.reporter}
          control={control}
        />
      </div>
      <div className={classes.inputField}>
        <Controller
          control={control}
          name="estimatedTime"
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Estimated time"
              type="number"
              variant="outlined"
              error={errors.estimatedTime ? true : false}
              helperText={
                errors.estimatedTime ? errors.estimatedTime.message : ''
              }
            />
          )}
        />
      </div>
      <div className={classes.inputField}></div>
      <div className={classes.inputField}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          startIcon={<Save />}
          fullWidth
          //FIXME:   disabled={loading}
        >
          Save Issue
        </Button>
      </div>
    </form>
  );
};

export default UpdateIssueDetail;

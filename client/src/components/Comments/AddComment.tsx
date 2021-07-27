import { ApolloError, useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { CREATE_COMMENT, UPDATE_COMMENT } from '../../graphql/commentMutation';
import { useCommentStyles } from '../../styles/muiStyles';

interface INewComment {
  body: string;
}

interface IProps {
  unsetNewComment: () => void;
  commentId?: string;
  commentBody?: string;
}

const AddComment = ({ unsetNewComment, commentId, commentBody }: IProps) => {
  const classes = useCommentStyles();
  const { sidebarState } = useContext(ProjectContext);
  const { issueState } = useContext(IssueContext);
  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<INewComment>({
    defaultValues: {
      body: commentId ? commentBody : '',
    },
  });

  const GQL_MUTATION = commentId ? UPDATE_COMMENT : CREATE_COMMENT;

  const [createUpdateComment, { loading }] = useMutation(GQL_MUTATION, {
    onError(err: ApolloError) {
      console.log(err.graphQLErrors);
    },
  });

  const onSubmit = async (data: INewComment) => {
    await createUpdateComment({
      variables: {
        issueId: issueState.issueId,
        projectId: sidebarState.currProject,
        commentId: commentId ? commentId : null,
        body: data.body,
      },
    });
    await unsetNewComment();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="body"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="Add comment"
            fullWidth
            size="small"
            autoFocus
            error={errors.body ? true : false}
            multiline
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        type="submit"
        className={classes.newCommentActions}
        disabled={loading}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={unsetNewComment}
        className={classes.newCommentActions}
        disabled={loading}
      >
        Cancel
      </Button>
    </form>
  );
};

export default AddComment;

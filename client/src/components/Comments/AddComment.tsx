import { ApolloError, useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { CREATE_COMMENT } from '../../graphql/commentMutation';
import { useCommentStyle } from '../../styles/muiStyles';

interface INewComment {
  body: string;
}

interface IProps {
  unsetNewComment: () => void;
}

const AddComment = ({ unsetNewComment }: IProps) => {
  const classes = useCommentStyle();
  const { sidebarState } = useContext(ProjectContext);
  const { issueState } = useContext(IssueContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewComment>();

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    onError(err: ApolloError) {
      console.log(err.graphQLErrors);
    },
  });

  const onSubmit = async (data: INewComment) => {
    await createComment({
      variables: {
        issueId: issueState.issueId,
        projectId: sidebarState.currProject,
        body: data.body,
      },
    });
    await unsetNewComment();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        label="Add comment"
        {...register('body', { required: true })}
        fullWidth
        size="small"
        autoFocus
        error={errors.body ? true : false}
        multiline
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

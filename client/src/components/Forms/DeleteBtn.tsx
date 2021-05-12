import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { DELETE_ISSUE } from '../../graphql/issuesMutation';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { DELETE_PROJECT } from '../../graphql/projectMutations';
import { GET_PROJECTS } from '../../graphql/projectQuery';
import { useDeleteBtnStyles } from '../../styles/muiStyles';

interface IProps {
  projectId: string;
  issueId?: string;
  name?: string;
}
interface IProject {
  id: string;
}

interface IProjects {
  getProjects: IProject[];
}

interface IIssue {
  id: string;
}

interface IIssues {
  getIssues: IIssue[];
}

type ProjectQueryType = IProjects | null;

type IssueQueryType = IIssues | null;

const DeleteBtn = ({ projectId, name, issueId }: IProps) => {
  const classes = useDeleteBtnStyles();
  const [open, setOpen] = useState(false);
  const { setSidebarState } = useContext(ProjectContext);
  const { setIssueState } = useContext(IssueContext);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const DELETE_MUTATION = issueId ? DELETE_ISSUE : DELETE_PROJECT;

  const [deleteItem] = useMutation(DELETE_MUTATION, {
    update(proxy) {
      if (issueId) {
        const data: IssueQueryType = proxy.readQuery({
          query: GET_ISSUES,
          variables: {
            projectId,
          },
        });
        if (data)
          proxy.writeQuery({
            query: GET_ISSUES,
            variables: {
              projectId,
            },
            data: {
              getIssues: data.getIssues.filter(
                (issue: IIssue) => issue.id !== issueId
              ),
            },
          });
      } else {
        const data: ProjectQueryType = proxy.readQuery({
          query: GET_PROJECTS,
        });
        if (data)
          proxy.writeQuery({
            query: GET_PROJECTS,
            data: {
              getProjects: data.getProjects.filter(
                (project: IProject) => project.id !== projectId
              ),
            },
          });
      }
    },
    variables: {
      issueId,
      projectId,
    },
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleDeleteProject = () => {
    setOpen(false);
    deleteItem();
    history.push(issueId ? `/project/${projectId}` : '/');
    if (issueId) {
      setIssueState({ open: false, issueId: '' });
    } else {
      setSidebarState({ currProject: '', projectAction: '' });
    }
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Delete {issueId ? 'issue' : 'project'}
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Are you sure you want to delete this{' '}
          {issueId ? 'issue' : `project ${name}`}
        </DialogTitle>
        <DialogActions>
          <div className={classes.dialogActionsWrapper}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.actionBtn}
              onClick={handleDeleteProject}
            >
              Delete {issueId ? 'issue' : 'project'}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBtn;

import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ProjectContext } from '../../context/project';
import { DELETE_PROJECT } from '../../graphql/projectMutations';
import { GET_PROJECTS } from '../../graphql/projectQuery';
import { useDeleteBtnStyles } from '../../styles/muiStyles';

interface IProps {
  projectId: string;
  name: string;
}

const DeleteProjectBtn = ({ projectId, name }: IProps) => {
  const classes = useDeleteBtnStyles();
  const [open, setOpen] = useState(false);
  const { setSidebarState } = useContext(ProjectContext);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    update(proxy) {
      const data: any = proxy.readQuery({
        query: GET_PROJECTS,
      });
      proxy.writeQuery({
        query: GET_PROJECTS,
        data: {
          getProjects: data.getProjects.filter(
            (project: any) => project.id !== projectId
          ),
        },
      });
    },
    variables: {
      projectId,
    },
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleDeleteProject = () => {
    deleteProject();
    setOpen(false);
    history.push('/');
    setSidebarState({ currProject: '', projectAction: '' });
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Delete project
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Are you sure you want to delete this project {name}
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
              Delete project
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProjectBtn;

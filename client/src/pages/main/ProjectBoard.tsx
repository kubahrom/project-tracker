import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import Board from '../../components/Board/Board';
import { AuthContext } from '../../context/auth';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { useBoardPageStyles } from '../../styles/muiStyles';
import { isCreateIssueLink } from '../../utils/checkLink';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IProjectProps {
  project: {
    id: string;
    name: string;
    category: string;
    description: string;
    type: string;
    createdAt: string;
    author: IUser;
    shared: IUser[];
    __typename: string;
  };
}

interface ParamType {
  projectId: string;
  issueId: string;
}

const ProjectBoard = ({ project }: IProjectProps) => {
  const classes = useBoardPageStyles();
  const location = useLocation();
  const { setIssueState } = useContext(IssueContext);
  const { setSidebarState } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const { projectId, issueId } = useParams<ParamType>();

  useEffect(() => {
    setSidebarState({
      currProject: projectId,
      projectAction: 'board',
      isAuthor: project.author.id === user?.id ? true : false,
    });
  }, [projectId, user, project.author.id, setSidebarState]);

  useEffect(() => {
    if (isCreateIssueLink(location.pathname)) {
      setIssueState({ open: true });
    }
    if (issueId) {
      setIssueState({ open: true, issueId });
    }
  }, [location.pathname, setIssueState, issueId]);

  return (
    <Paper elevation={2}>
      <div className={classes.pageWrapper}>
        <div className={classes.pageHeader}>
          <div className={classes.titleWrapper}>
            <Typography variant="h4" component="h1" color="primary">
              {project.name}
            </Typography>
            <Typography variant="body1" component="span">
              Kanban board
            </Typography>
          </div>
          <Typography variant="body1" component="p">
            <span className={classes.helperText}>Category: </span>
            {project.category}
          </Typography>
          <Typography variant="body1" component="p">
            <span className={classes.helperText}>Created At: </span>
            {new Date(project.createdAt).toLocaleString()}
          </Typography>
          {project.description && (
            <>
              <Typography variant="body1" component="p">
                <span className={classes.helperText}>Description: </span>
                {project.description}
              </Typography>
            </>
          )}
          <Typography variant="body1" component="p">
            <span className={classes.helperText}>Author: </span>
            {`${project.author.firstName} ${project.author.lastName}`}
          </Typography>
          {project.shared.length !== 0 && (
            <Typography variant="body1" component="p">
              <span className={classes.helperText}>Shared to: </span>
              {project.shared.map(
                (user: IUser, index: number) =>
                  `${user.firstName} ${user.lastName} ${
                    project.shared[index + 1] ? ', ' : ''
                  }`
              )}
            </Typography>
          )}
        </div>
        <Board projectId={project.id} />
      </div>
    </Paper>
  );
};

export default ProjectBoard;

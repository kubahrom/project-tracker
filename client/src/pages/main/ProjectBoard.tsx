import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import Board from '../../components/Board/Board';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { useBoardPageStyles } from '../../styles/muiStyles';
import { isCreateIssueLink } from '../../utils/checkLink';

interface IProjectProps {
  project: {
    id: string;
    name: string;
    category: string;
    description: string;
    createdAt: string;
    __typename: string;
  };
}

interface ParamType {
  projectId: string;
}

const ProjectBoard = ({ project }: IProjectProps) => {
  const classes = useBoardPageStyles();
  const location = useLocation();
  const { setIssueState } = useContext(IssueContext);
  const { setSidebarState } = useContext(ProjectContext);
  const { projectId } = useParams<ParamType>();

  useEffect(() => {
    setSidebarState({ currProject: projectId, projectAction: 'board' });
  }, [projectId, setSidebarState]);

  useEffect(() => {
    if (isCreateIssueLink(location.pathname)) {
      setIssueState({ open: true });
    }
  }, [location.pathname, setIssueState]);

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
        </div>
        <Board projectId={project.id} />
      </div>
    </Paper>
  );
};

export default ProjectBoard;

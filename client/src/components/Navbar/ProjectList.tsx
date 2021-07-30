import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Assessment } from '@material-ui/icons';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { ProjectContext } from '../../context/project';

interface IProject {
  id: string;
  name: string;
  author: {
    id: string;
  };
}

interface IProps {
  title: String;
  noProjectText: string;
  projects?: IProject[];
  handleDrawerClose: () => void;
}

const ProjectList = ({
  title,
  noProjectText,
  projects,
  handleDrawerClose,
}: IProps) => {
  const { sidebarState, setSidebarState } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);

  const handleProjectClick = (projectId: string, authorId: string) => {
    setSidebarState({
      projectAction: 'board',
      currProject: projectId,
      isAuthor: authorId === user?.id && true,
    });
    handleDrawerClose();
  };

  return (
    <List>
      <ListItem>
        <ListItemText primary={title + ':'} />
      </ListItem>
      {projects && projects.length !== 0 ? (
        projects.map((project: IProject) => (
          <ListItem
            button
            key={project.id}
            component={Link}
            to={`/project/${project.id}`}
            onClick={() => handleProjectClick(project.id, project.author.id)}
            selected={project.id === sidebarState.currProject}
          >
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary={project.name} />
          </ListItem>
        ))
      ) : (
        <ListItem disabled>
          <ListItemText primary={noProjectText} />
        </ListItem>
      )}
    </List>
  );
};

export default ProjectList;

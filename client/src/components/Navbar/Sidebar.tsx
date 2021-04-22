import React, { useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/projectQuery';
import { Link, useLocation } from 'react-router-dom';
import { ProjectContext, ProjectAction } from '../../context/project';
import {
  AddBox,
  AddComment,
  Assessment,
  Dashboard,
  Settings,
} from '@material-ui/icons';
import { IssueContext } from '../../context/issue';

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
}

interface IProject {
  id: string;
  name: string;
}

interface IProjects {
  getProjects: IProject[];
}

const Sidebar = (props: Props) => {
  const { window, handleDrawerToggle, mobileOpen } = props;
  const classes = useStyles();
  const { setIssueState } = useContext(IssueContext);
  const location = useLocation();
  const { loading, data: { getProjects: projects } = {} } = useQuery<IProjects>(
    GET_PROJECTS
  );
  const { sidebarState, setSidebarState } = useContext(ProjectContext);

  const handleProjectClick = (projectId: string) => {
    setSidebarState({ projectAction: 'board', currProject: projectId });
    props.handleDrawerClose();
  };
  const handleProjectActionClick = (action: ProjectAction) => {
    setSidebarState({ ...sidebarState, projectAction: action });
    props.handleDrawerClose();
  };

  const handleCreateProjectClick = () => {
    setSidebarState({ currProject: '', projectAction: 'createProject' });
    props.handleDrawerClose();
  };

  const handleClickCreateIssue = () => {
    setIssueState({
      open: true,
    });
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <ListItemText primary="Project actions:" />
        </ListItem>
        <ListItem
          button
          disabled={!Boolean(sidebarState.currProject)}
          component={Link}
          to={`/project/${sidebarState.currProject}`}
          onClick={() => handleProjectActionClick('board')}
          selected={sidebarState.projectAction === 'board'}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Kanban board" />
        </ListItem>
        <ListItem
          button
          disabled={!Boolean(sidebarState.currProject)}
          onClick={handleClickCreateIssue}
          component={Link}
          to={`${location.pathname}/create-issue`}
        >
          <ListItemIcon>
            <AddComment />
          </ListItemIcon>
          <ListItemText primary="Create issue" />
        </ListItem>

        <ListItem
          button
          disabled={!Boolean(sidebarState.currProject)}
          component={Link}
          to={`/project/settings/${sidebarState.currProject}`}
          onClick={() => handleProjectActionClick('settings')}
          selected={sidebarState.projectAction === 'settings'}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to="/project/create"
          onClick={handleCreateProjectClick}
          selected={sidebarState.projectAction === 'createProject'}
        >
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Create project" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Your Projects:" />
        </ListItem>
        {projects && projects.length !== 0 ? (
          projects.map((project: IProject) => (
            <ListItem
              button
              key={project.id}
              component={Link}
              to={`/project/${project.id}`}
              onClick={() => handleProjectClick(project.id)}
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
            <ListItemText
              primary={
                loading ? 'Loading projects' : "You don't have any project"
              }
            />
          </ListItem>
        )}
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden lgUp implementation="css">
        <SwipeableDrawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          onOpen={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          disableBackdropTransition
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;

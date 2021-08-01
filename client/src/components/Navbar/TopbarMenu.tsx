import {
  Avatar,
  Button,
  makeStyles,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { ThemeContext } from '../../context/theme';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { ExitToApp, ExpandLess, ExpandMore, Person } from '@material-ui/icons';
import { useApolloClient } from '@apollo/client';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';

const useStyles = makeStyles(
  theme => ({
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white,
    },
    userInfo: {
      paddingRight: theme.spacing(1),
      [theme.breakpoints.only('xs')]: {
        display: 'none',
      },
    },
    themeIcon: {
      minWidth: 'auto',
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    popover: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    menuItem: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      minHeight: 30,
    },
  }),
  { index: 1 }
);

const TopbarMenu: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const { setIssueState } = useContext(IssueContext);
  const { setSidebarState } = useContext(ProjectContext);
  const client = useApolloClient();
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSet = Boolean(anchorEl);
  const id = openSet ? 'dropdown-menu' : undefined;

  const handleLogout = () => {
    handleClose();
    logout();
    setIssueState({ open: false, issueId: '' });
    setSidebarState({ currProject: '', projectAction: '', isAuthor: false });
    client.clearStore();
  };

  return (
    <div>
      <Tooltip title={darkTheme ? 'Turn light mode' : 'Turn dark mode'} arrow>
        <Button
          aria-label="dark-mode"
          onClick={() => setDarkTheme(!darkTheme)}
          color="inherit"
          className={classes.themeIcon}
        >
          {darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </Button>
      </Tooltip>
      {user ? (
        <>
          <Button color="inherit" onClick={handleClick}>
            <span className={classes.userInfo}>
              {user.firstName} {user.lastName}
            </span>
            <Avatar className={classes.avatar}>
              <Person fontSize="small" color="inherit" />
            </Avatar>
            {openSet ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Popover
            id={id}
            open={openSet}
            anchorEl={anchorEl}
            onClose={handleClose}
            className={classes.popover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuList autoFocusItem={Boolean(anchorEl)}>
              <MenuItem className={classes.menuItem} onClick={handleLogout}>
                <ExitToApp />
                Logout
              </MenuItem>
            </MenuList>
          </Popover>
        </>
      ) : (
        <>
          <Link to="/login" className={classes.link}>
            <Button color="inherit">Sign In</Button>
          </Link>
          <Link to="/register" className={classes.link}>
            <Button color="inherit">Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default TopbarMenu;

import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import TopbarMenu from './TopbarMenu';
import { ProjectContext } from '../../context/project';
import { IssueContext } from '../../context/issue';
import { DeveloperBoard } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    leftWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    appBar: {
      zIndex: 1301,
      [theme.breakpoints.up('md')]: {},
    },
    menuButton: {
      [theme.breakpoints.only('sm')]: {
        marginRight: theme.spacing(1),
      },
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    logo: {
      textDecoration: 'none',
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  })
);

interface ITopbarProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const Topbar = ({ handleDrawerToggle, mobileOpen }: ITopbarProps) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { setSidebarState } = useContext(ProjectContext);
  const { setIssueState } = useContext(IssueContext);

  const handleLogoClick = () => {
    setSidebarState({ currProject: '', projectAction: '' });
    setIssueState({ open: false, issueId: '', updateIssue: false });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftWrapper}>
          {user && (
            <IconButton
              color="inherit"
              aria-label={mobileOpen ? 'Close drawer' : 'Open drawer'}
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            <Link to="/" className={classes.logo} onClick={handleLogoClick}>
              <DeveloperBoard className={classes.icon} />
              Project tracker
            </Link>
          </Typography>
        </div>
        <TopbarMenu />
      </Toolbar>
    </AppBar>
  );
};
export default Topbar;

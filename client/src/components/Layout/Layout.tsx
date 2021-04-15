import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Routes from '../../Routes';
import Navbar from '../Navbar/Navbar';
import { drawerWidth } from '../Navbar/Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(1),
      },
    },
  })
);

const Layout: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes />
      </main>
    </div>
  );
};

export default Layout;

import { makeStyles } from '@material-ui/core';

export const useAuthStyles = makeStyles(theme => ({
  formWrapper: {
    maxWidth: 700,
    margin: 'auto',
    marginTop: 100,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  form: {
    padding: theme.spacing(2),
    paddingTop: 0,
    [theme.breakpoints.only('xs')]: {
      padding: 0,
    },
  },
  inputField: {
    padding: theme.spacing(1),
  },
  inputFieldSmallWrapper: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  inputFieldSmall: {
    width: '50%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      '&:first-child': {
        paddingBottom: theme.spacing(1),
      },
      '&:last-child': {
        paddingTop: theme.spacing(1),
      },
    },
    [theme.breakpoints.up('sm')]: {
      '&:first-child': {
        paddingRight: theme.spacing(1),
      },
      '&:last-child': {
        paddingLeft: theme.spacing(1),
      },
    },
  },
  btnSubmit: {
    padding: '12px 22px',
  },
  generalErr: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
}));

export const useCreateProjectStyles = makeStyles(theme => ({
  formWrapper: {
    maxWidth: 700,
    margin: 'auto',
    padding: theme.spacing(4),
    paddingTop: 40,
    paddingBottom: 60,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
      paddingTop: 20,
      paddingBottom: 20,
    },
  },
  form: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },
  btnSubmit: {
    padding: '12px 22px',
  },
  inputField: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export const useDeleteBtnStyles = makeStyles(theme => ({
  dialogActionsWrapper: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  actionBtn: {
    marginLeft: 8,
  },
}));

export const useBoardPageStyles = makeStyles(theme => ({
  pageWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  pageHeader: {
    paddingBottom: theme.spacing(3),
  },
  titleWrapper: {
    paddingBottom: theme.spacing(1),
  },
  helperText: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
    },
  },
}));

export const useBoardStyles = makeStyles(theme => ({
  boardWrapper: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  list: {
    width: `calc(25% - ${theme.spacing(1)}px)`,
    minHeight: 180,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    boxShadow:
      ' inset 0px 3px 1px -2px rgb(0 0 0 / 20%),inset 0px 2px 2px 0px rgb(0 0 0 / 14%),inset 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    [theme.breakpoints.down('md')]: {
      width: `calc(50% - ${theme.spacing(2)}px)`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
  listCaption: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.1em',
    padding: theme.spacing(1),
  },
  issueWrapper: {
    padding: theme.spacing(1),
    height: 'calc(100% - 41px)',
  },
  issue: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    // cursor: 'pointer !important',
  },
  issueArrow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const useIssueModalStyle = makeStyles(theme => ({
  modalWrapper: {
    padding: theme.spacing(4),
  },
  formWrapper: {
    paddingTop: theme.spacing(2),
  },
  inputField: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  btnCancel: { textAlign: 'right', paddingTop: 8 },
}));

export const usePriorityListStyle = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(1) },

  highest: {
    color: theme.palette.error.main,
  },
  high: { color: theme.palette.error.light },
  low: {
    color: theme.palette.primary.light,
  },
  lowest: {
    color: theme.palette.info.main,
  },
}));

export const useUpdateIssueDetailStyle = makeStyles(theme => ({
  inputField: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

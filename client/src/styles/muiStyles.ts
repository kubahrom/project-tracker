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

export const useHomeStyles = makeStyles(theme => ({
  loadingSpinnerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(8),
  },
}));

export const useYourProjectsStyles = makeStyles(theme => ({
  cardWrapper: {
    display: 'flex',
  },
  gridItem: {
    padding: theme.spacing(1),
    [theme.breakpoints.only('sm')]: {
      '&:nth-child(odd)': {
        paddingLeft: 0,
      },
      '&:nth-child(even)': {
        paddingRight: 0,
      },
    },
    [theme.breakpoints.up('md')]: {
      '&:nth-child(3n+1)': {
        paddingLeft: 0,
      },
      '&:nth-child(3n+0)': {
        paddingRight: 0,
      },
    },
  },
  card: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    height: '100%',
  },
  helperText: {
    color: theme.palette.text.secondary,
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
  subTitle: {
    paddingBottom: theme.spacing(1),
  },
  chip: {
    margin: 4,
    marginLeft: 0,
  },
}));

export const useYourIssuesStyles = makeStyles(theme => ({
  paperWrapper: {
    padding: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    height: '100%',
  },
  helperText: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
  },
  issuesWrapper: {
    background: theme.palette.background.default,
    boxShadow:
      ' inset 0px 3px 1px -2px rgb(0 0 0 / 20%),inset 0px 2px 2px 0px rgb(0 0 0 / 14%),inset 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    borderRadius: 4,
    width: '100%',
    padding: theme.spacing(1),
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardContent: { display: 'flex' },
  col: { width: '60%' },
  col2: { width: '40%' },
  noneIssueWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(7)}px ${theme.spacing(3)}px`,
  },
  noneIssueText: {
    paddingBottom: theme.spacing(1),
  },
}));

export const useYourIssuesFilterStyles = makeStyles(theme => ({
  filterWrapper: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputField: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('sm')]: {
      width: 'calc((100% - 16px) / 3)',
      marginRight: 8,
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
}));

export const useNoneProjectsStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(2),
    },
  },
  logo: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.h5.fontSize,
      marginBottom: theme.spacing(1),
    },
  },
  subtitle: {
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.subtitle1.fontSize,
    },
  },
  button: {
    marginTop: theme.spacing(2),
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
  btn: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1),
    minWidth: 'auto',
  },
  link: {
    cursor: 'pointer',
  },
  dialogTitle: {
    paddingBottom: theme.spacing(1),
  },
  dialogContent: {
    paddingTop: 0,
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
    borderRadius: 4,
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
  issueInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  issueIcons: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const useIssueModalStyles = makeStyles(theme => ({
  modalWrapper: {
    padding: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(2),
    },
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

export const usePriorityListStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(1) },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
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

export const useIssueTypeStyles = makeStyles(theme => ({
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: { marginRight: theme.spacing(1) },
  task: {
    color: theme.palette.info.light,
  },
  bug: {
    color: theme.palette.error.light,
  },
  story: {
    color: theme.palette.success.light,
  },
}));

export const useUpdateIssueDetailStyles = makeStyles(theme => ({
  inputField: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  inputFieldSmallWrapper: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: 'flex',
    },
  },
  inputFieldSmall: {
    width: 'calc(100% / 3)',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      '&:first-child': {
        paddingBottom: theme.spacing(1),
        paddintTop: 0,
      },
      '&:last-child': {
        paddingTop: theme.spacing(1),
        paddingBottom: 0,
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      '&:first-child': {
        paddingRight: theme.spacing(1),
        paddingLeft: 0,
      },
      '&:last-child': {
        paddingLeft: theme.spacing(1),
        paddingRight: 0,
      },
    },
  },
}));

export const useIssueHeaderStyles = makeStyles(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  headerActions: {
    alignSelf: 'flex-end',
    [theme.breakpoints.only('xs')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  id: {
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 0,
      wordBreak: 'break-all',
    },
  },
  dash: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  helperText: {
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },
  btn: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1),
    minWidth: 'auto',
  },
}));

export const useIssueDetailStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  body: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(4),
    },
  },
  description: {
    paddingTop: theme.spacing(2),
  },
  sidebarText: {
    lineHeight: 1.8,
    paddingBottom: theme.spacing(1),
  },
  helperText: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  chip: {
    margin: 4,
    marginLeft: 0,
  },
  line: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1),
    borderTop: '1px solid',
    borderColor: theme.palette.grey[400],
  },
  timeTrackerWrapper: {
    marginLeft: theme.spacing(-1),
    padding: theme.spacing(1),
    paddingTop: 0,
    cursor: 'pointer',
    transition: 'all 200ms',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[2],
    },
    '&:focus': {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[2],
    },
  },
  timeTracker: {
    display: 'flex',
    alignItems: 'center',
  },
  progressWrapper: {
    width: '100%',
    paddingLeft: theme.spacing(1),
  },
  progress: {
    height: 5,
  },
  progressValues: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 6,
    fontSize: '0.8em',
    color: theme.palette.text.secondary,
  },
  timeNumber: {
    fontSize: '1.3em',
    lineHeight: 1,
  },
}));

export const useTimeTrackerStyles = makeStyles(theme => ({
  dialogTitle: {
    paddingBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  form: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  inputWrapper: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  inputField: {
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      '&:first-child': {
        paddingRight: theme.spacing(1),
      },
      '&:last-child': {
        paddingLeft: theme.spacing(1),
      },
    },
    [theme.breakpoints.only('xs')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  dialogActions: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  [theme.breakpoints.only('xs')]: {
    paddingTop: theme.spacing(1),
  },
}));

export const useCommentStyles = makeStyles(theme => ({
  commentsSection: { paddingTop: theme.spacing(4) },
  newComment: {
    padding: 8,
    paddingLeft: 12,
    border: '1px solid',
    borderColor: theme.palette.text.secondary,
    borderRadius: 6,
    transition: 'all 200ms',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[2],
    },
    '&:focus': {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[2],
    },
  },
  newCommentActions: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginBottom: 0,
  },
  commentsWrapper: {
    marginTop: theme.spacing(2),
  },
  commentWrapper: {
    paddingBottom: theme.spacing(1),
    display: 'flex',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.typography.subtitle1.fontSize,
    marginRight: theme.spacing(2),
  },
  helperText: {
    color: theme.palette.text.secondary,
  },
  commentAction: {
    display: 'flex',
    color: theme.palette.text.secondary,
  },
  action: {
    paddingRight: 6,
    paddingLeft: 0,
    cursor: 'pointer',
  },
}));

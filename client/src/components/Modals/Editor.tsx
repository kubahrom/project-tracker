import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ThemeContext } from '../../context/theme';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  editor: {
    '& .ql-snow .ql-picker.ql-expanded .ql-picker-options, & .ql-snow .ql-tooltip': {
      zIndex: 2,
      border: 0,
    },
    //editor toolbar
    // '& .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected,': {
    //   color: theme.palette.primary.main,
    // },
    //
  },
  editorDarkTheme: {
    '& .ql-snow .ql-stroke': {
      stroke: theme.palette.common.white,
    },
    '& .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill': {
      fill: theme.palette.common.white,
    },
    '& .ql-picker-label': {
      color: theme.palette.common.white,
    },
    '& .ql-snow .ql-picker-options': {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.common.white,
      '&:hover': {},
    },
    '& .ql-container.ql-snow, & .ql-toolbar.ql-snow': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    //Editor border
    // '&:hover .ql-container.ql-snow, &:hover .ql-toolbar.ql-snow': {
    //   borderColor: theme.palette.common.white,
    // },
  },
}));

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [
      'bold',
      'italic',
      'underline',
      'strike',
      { color: [] },
      { background: [] },
      'blockquote',
      'code-block',
      { list: 'ordered' },
      { list: 'bullet' },
      'link',
      'clean',
    ],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'color',
  'background',
  'list',
  'bullet',
  'link',
];

interface IProps {
  editor: string;
  setEditor: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ editor, setEditor }: IProps) => {
  const { darkTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <ReactQuill
      value={editor}
      onChange={setEditor}
      modules={modules}
      formats={formats}
      //   className={darkTheme ? classes.editor : ''}
      className={clsx(classes.editor, darkTheme && classes.editorDarkTheme)}
    />
  );
};

export default Editor;

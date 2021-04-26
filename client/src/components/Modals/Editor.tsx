import { makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
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
    // '& .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected,': {
    //   color: theme.palette.primary.main,
    // },
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

const Editor = () => {
  const [data, setData] = useState('');
  const { darkTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <ReactQuill
      value={data}
      onChange={setData}
      modules={modules}
      formats={formats}
      //   className={darkTheme ? classes.editor : ''}
      className={clsx(classes.editor, darkTheme && classes.editorDarkTheme)}
    />
  );
};

export default Editor;

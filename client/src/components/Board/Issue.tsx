import { Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { IssueContext } from '../../context/issue';
import { ProjectContext } from '../../context/project';
import { useBoardStyles } from '../../styles/muiStyles';
import BoardIssueAvatars from '../Other/BoardIssueAvatars';
import PriorityArrow from '../Other/PriorityArrow';
import { IIssue } from './Board';

interface IIssueProps {
  issue: IIssue;
  index: number;
}

const Issue = ({ issue, index }: IIssueProps) => {
  const classes = useBoardStyles();
  const { sidebarState } = useContext(ProjectContext);
  const { setIssueState } = useContext(IssueContext);

  const handleClick = () => {
    setIssueState({ open: true, issueId: issue.id });
  };
  return (
    <Draggable draggableId={issue.id} index={index}>
      {provided => (
        <Link
          to={`/project/${sidebarState.currProject}/issue/${issue.id}`}
          onClick={handleClick}
        >
          <Paper
            elevation={2}
            className={classes.issue}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Typography variant="subtitle1" component="span">
              {issue.name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.issueArrow}
            >
              <PriorityArrow option={issue.priority} board={true} />
              <BoardIssueAvatars asignees={issue.asignees} />
            </Typography>
          </Paper>
        </Link>
      )}
    </Draggable>
  );
};

export default Issue;

import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useBoardStyles } from '../../styles/muiStyles';
import { IIssue } from './Board';
import Issue from './Issue';

interface IListProps {
  status: string;
  issues?: IIssue[];
}

const List = ({ issues, status }: IListProps) => {
  const [sortedIssues, setSortedIssues] = useState<IIssue[]>([]);
  const classes = useBoardStyles();

  useEffect(() => {
    if (issues)
      setSortedIssues(
        issues.sort((a, b) => {
          if (a.index > b.index) return 1;
          return -1;
        })
      );
  }, [issues]);

  return (
    <div className={classes.list}>
      <Typography
        variant="caption"
        className={classes.listCaption}
        align="center"
      >
        {status.toUpperCase()}
      </Typography>
      <Droppable droppableId={status}>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.issueWrapper}
          >
            {sortedIssues.map((issue: IIssue, index: number) => (
              <Issue issue={issue} key={issue.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;

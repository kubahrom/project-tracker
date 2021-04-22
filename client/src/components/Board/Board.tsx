import { useApolloClient, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { useBoardStyles } from '../../styles/muiStyles';
import List from './List';

interface IBoardProps {
  projectId: string;
}

export interface IIssue {
  id: string;
  name: string;
  status: string;
}

interface IIssues {
  getIssues: IIssue[];
}

const Board = ({ projectId }: IBoardProps) => {
  const classes = useBoardStyles();
  const statusList: string[] = [
    'backlog',
    'for development',
    'in progress',
    'done',
  ];
  const client = useApolloClient();
  const cachedIssues = client.readQuery({
    query: GET_ISSUES,
  });

  const { loading, data: { getIssues: issues } = {} } = useQuery<IIssues>(
    GET_ISSUES,
    {
      variables: {
        projectId,
      },
      skip: Boolean(cachedIssues),
    }
  );

  const handleDragEnd = (result: any) => {
    console.log(result);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={classes.boardWrapper}>
            {statusList.map((status: string) => (
              <List
                key={status}
                issues={issues!.filter(
                  (issue: IIssue) => issue.status === status
                )}
                status={status}
              />
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default Board;

import { useApolloClient, useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { useBoardStyles } from '../../styles/muiStyles';
import { statusList } from '../../utils/constants';
import List from './List';
import useReorderHook from '../../utils/hooks/useReorderHook';

interface IBoardProps {
  projectId: string;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IIssue {
  id: string;
  name: string;
  status: string;
  index: string;
  priority: string;
  type: string;
  commentCount: number;
  asignees: IUser[];
}

interface IIssues {
  getIssues: IIssue[];
}

const Board = ({ projectId }: IBoardProps) => {
  const classes = useBoardStyles();
  const client = useApolloClient();

  const cachedIssues = client.readQuery({
    query: GET_ISSUES,
    variables: {
      projectId,
    },
  });
  const [getIssues, { loading }] = useLazyQuery<IIssues>(GET_ISSUES, {
    variables: {
      projectId,
    },
  });

  const { reorderIssue } = useReorderHook(projectId);

  const handleDragEnd = (result: DropResult) => {
    reorderIssue(result);
  };

  const [isMounted, setMounted] = useState(true);
  useEffect(() => {
    if (isMounted && !Boolean(cachedIssues)) {
      getIssues();
    }
    return () => {
      setMounted(false);
    };
  }, [getIssues, isMounted, cachedIssues]);

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
                issues={cachedIssues?.getIssues.filter(
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

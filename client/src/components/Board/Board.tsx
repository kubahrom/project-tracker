import {
  ApolloError,
  useApolloClient,
  useMutation,
  useQuery,
} from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { UPDATE_BOARD_ISSUE } from '../../graphql/issuesMutation';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { useBoardStyles } from '../../styles/muiStyles';
import { statusList } from '../../utils/constants';
import { LexoRank } from 'lexorank';
import List from './List';

interface IBoardProps {
  projectId: string;
}

export interface IIssue {
  id: string;
  name: string;
  status: string;
  index: string;
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
  const { loading } = useQuery<IIssues>(GET_ISSUES, {
    variables: {
      projectId,
    },
    skip: Boolean(cachedIssues),
  });

  const [updateIssue] = useMutation(UPDATE_BOARD_ISSUE, {
    onError(err: ApolloError) {
      console.log(err);
    },
  });

  const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) return;
    console.log(source, destination);
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const targetStatusIssues =
      cachedIssues.getIssues.length !== 0
        ? cachedIssues.getIssues
            .filter((issue: any) => issue.status === destination.droppableId)
            .sort((a: any, b: any) => {
              if (a.index > b.index) return 1;
              return -1;
            })
        : '';

    const indexOnTarget = targetStatusIssues[destination.index]
      ? targetStatusIssues[destination.index].index
      : '';

    const indexBeforeTarget = targetStatusIssues[destination.index - 1]
      ? targetStatusIssues[destination.index - 1].index
      : '';

    const indexNextTarget = targetStatusIssues[destination.index + 1]
      ? targetStatusIssues[destination.index + 1].index
      : '';

    console.log(targetStatusIssues);
    console.log('Before:', destination.index - 1, indexBeforeTarget);
    console.log('Target:', destination.index, indexOnTarget);

    if (destination.droppableId === source.droppableId) {
      let newIndex = '';
      if (indexBeforeTarget === '') {
        console.log('První');
        newIndex = LexoRank.parse(indexOnTarget).genPrev().toString();
      } else if (indexNextTarget === '') {
        console.log('Poslední');
        newIndex = LexoRank.parse(indexOnTarget).genNext().toString();
      } else {
        //FIXME: need to check if moved up or down to get the index
        newIndex = LexoRank.parse(indexOnTarget)
          .between(LexoRank.parse(indexNextTarget))
          .toString();
      }

      updateIssue({
        variables: {
          projectId,
          issueId: draggableId,
          index: newIndex,
        },
      });
      return;
    }
    console.log('Změna statusu');
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
                issues={
                  // issues
                  //   ? issues.filter((issue: IIssue) => issue.status === status)
                  //   : cachedIssues.getIssues.filter(
                  //       (issue: IIssue) => issue.status === status
                  //     )
                  cachedIssues.getIssues.filter(
                    (issue: IIssue) => issue.status === status
                  )
                }
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

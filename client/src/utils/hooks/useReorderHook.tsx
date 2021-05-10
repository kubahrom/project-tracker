import { ApolloError, gql, useApolloClient, useMutation } from '@apollo/client';
import { DropResult } from 'react-beautiful-dnd';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { LexoRank } from 'lexorank';
import { UPDATE_BOARD_ISSUE } from '../../graphql/issuesMutation';

interface IIssue {
  status: string;
  index: string;
}

const useReorderHook = (projectId: string) => {
  const client = useApolloClient();

  const [updateIssue] = useMutation(UPDATE_BOARD_ISSUE, {
    onError(err: ApolloError) {
      console.log(err);
    },
  });

  const cachedIssues = client.readQuery({
    query: GET_ISSUES,
    variables: {
      projectId,
    },
  });

  const reorderIssue = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const targetStatusIssues =
      cachedIssues.getIssues.length !== 0
        ? cachedIssues.getIssues
            .filter((issue: IIssue) => issue.status === destination.droppableId)
            .sort((a: IIssue, b: IIssue) => {
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

    if (destination.droppableId === source.droppableId) {
      let newIndex = '';
      if (indexBeforeTarget === '') {
        newIndex = LexoRank.parse(indexOnTarget).genPrev().toString();
      } else if (indexNextTarget === '') {
        newIndex = LexoRank.parse(indexOnTarget).genNext().toString();
      } else if (source.index > destination.index) {
        newIndex = LexoRank.parse(indexBeforeTarget)
          .between(LexoRank.parse(indexOnTarget))
          .toString();
      } else {
        newIndex = LexoRank.parse(indexOnTarget)
          .between(LexoRank.parse(indexNextTarget))
          .toString();
      }

      client.writeFragment({
        id: `Issue:${draggableId}`,
        fragment: gql`
          fragment IssueIndexPart on Issue {
            index
          }
        `,
        data: {
          index: newIndex,
        },
      });
      updateIssue({
        variables: {
          projectId,
          issueId: draggableId,
          index: newIndex,
        },
      });
      return;
    }
    let newIndex = '';

    if (
      indexOnTarget === '' &&
      indexBeforeTarget === '' &&
      indexNextTarget === ''
    ) {
      newIndex = LexoRank.middle().toString();
    } else if (indexBeforeTarget === '') {
      newIndex = LexoRank.parse(indexOnTarget).genPrev().toString();
    } else if (indexOnTarget === '' && indexNextTarget === '') {
      newIndex = LexoRank.parse(indexBeforeTarget).genNext().toString();
    } else {
      newIndex = LexoRank.parse(indexBeforeTarget)
        .between(LexoRank.parse(indexOnTarget))
        .toString();
    }

    client.writeFragment({
      id: `Issue:${draggableId}`,
      fragment: gql`
        fragment IssueIndexStatusPart on Issue {
          index
          status
        }
      `,
      data: {
        index: newIndex,
        status: destination.droppableId,
      },
    });

    updateIssue({
      variables: {
        projectId,
        issueId: draggableId,
        index: newIndex,
        status: destination.droppableId,
      },
    });
    return;
  };

  return { reorderIssue };
};
export default useReorderHook;

import { useApolloClient } from '@apollo/client';
import { useContext } from 'react';
import { IIssue } from '../../components/Board/Board';
import { ProjectContext } from '../../context/project';
import { GET_ISSUES } from '../../graphql/issuesQuery';
import { LexoRank } from 'lexorank';

function useIndexUpdate() {
  const client = useApolloClient();
  const { sidebarState } = useContext(ProjectContext);

  const { getIssues } = client.readQuery({
    query: GET_ISSUES,
    variables: {
      projectId: sidebarState.currProject,
    },
  });

  const newIssueIndex = (status: string) => {
    const filteredIssues = getIssues.filter(
      (issue: IIssue) => issue.status === status
    );
    const sortedIssues = filteredIssues.sort((a: IIssue, b: IIssue) => {
      if (a.index > b.index) return 1;
      return -1;
    });
    if (sortedIssues[0]) {
      return LexoRank.parse(sortedIssues[0].index).genPrev().toString();
    } else {
      return LexoRank.middle().toString();
    }
  };

  return { newIssueIndex };
}

export default useIndexUpdate;

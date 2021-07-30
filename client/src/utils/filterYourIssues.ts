import { IFilterBy, IHomeIssue } from '../components/Home/YourIssues';
import { UserType } from '../context/auth';

type FilterYourIssuesType = (
  issues: IHomeIssue[],
  filterBy: IFilterBy,
  user: UserType
) => IHomeIssue[];

type SortYourIssuesType = (
  issues: IHomeIssue[],
  sortBy: string
) => IHomeIssue[];

export const filterYourIssues: FilterYourIssuesType = (
  issues,
  filterBy,
  user
) => {
  switch (filterBy.type) {
    case 'Type':
      return [...issues].filter(
        (issue: IHomeIssue) => issue.type === filterBy.value
      );
    case 'Status':
      return [...issues].filter(
        (issue: IHomeIssue) => issue.status === filterBy.value
      );
    case 'Priority':
      return [...issues].filter(
        (issue: IHomeIssue) => issue.priority === filterBy.value
      );
    case 'Role':
      return [...issues].filter((issue: IHomeIssue) => {
        switch (filterBy.value) {
          case 'Author':
            return issue.author.id === user?.id;
          case 'Reporter':
            return (
              issue.reporter.id === user?.id && issue.author.id !== user?.id
            );
          case 'Asignee':
            return (
              issue.reporter.id !== user?.id && issue.author.id !== user?.id
            );
          default:
            return issues;
        }
      });
    default:
      return issues;
  }
};

export const sortYourIssues: SortYourIssuesType = (issues, sortBy) => {
  return [...issues].sort((a: IHomeIssue, b: IHomeIssue) => {
    if (sortBy === 'latest') {
      if (a.updatedAt > b.updatedAt) return -1;
      return 1;
    } else {
      if (a.updatedAt > b.updatedAt) return 1;
      return -1;
    }
  });
};

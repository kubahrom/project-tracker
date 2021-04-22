export const isCreateIssueLink = (link: string): boolean => {
  const regex = 'W*(create-issue)[/]?$';
  const result = link.match(regex);
  if (result) return true;
  return false;
};

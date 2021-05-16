import React, { useState, createContext } from 'react';

interface IIssueContextState {
  open: boolean;
  issueId?: string;
  updateIssue?: boolean;
}

interface IContext {
  issueState: IIssueContextState;
  setIssueState: (newState: IIssueContextState) => void;
}

const IssueContext = createContext<IContext>({
  issueState: { open: false },
  setIssueState: (newState: IIssueContextState) => {},
});

const IssueProvider: React.FC = children => {
  const [issueState, setIssueState] = useState<IIssueContextState>({
    open: false,
    issueId: '',
    updateIssue: false,
  });
  return (
    <IssueContext.Provider
      value={{ issueState, setIssueState }}
      {...children}
    />
  );
};

export { IssueContext, IssueProvider };

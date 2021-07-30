import React, { useState, createContext } from 'react';

export type ProjectAction =
  | 'board'
  | 'addIssue'
  | 'settings'
  | 'createProject'
  | '';

interface IProjectContextState {
  currProject?: string;
  projectAction?: ProjectAction;
  isAuthor: boolean;
}
interface IContext {
  sidebarState: IProjectContextState;
  setSidebarState: (newState: IProjectContextState) => void;
}

const ProjectContext = createContext<IContext>({
  sidebarState: { isAuthor: false },
  setSidebarState: (newState: IProjectContextState) => {},
});
const ProjectProvider: React.FC = children => {
  const [sidebarState, setSidebarState] = useState<IProjectContextState>({
    currProject: '',
    projectAction: '',
    isAuthor: false,
  });
  return (
    <ProjectContext.Provider
      value={{ sidebarState, setSidebarState }}
      {...children}
    />
  );
};

export { ProjectContext, ProjectProvider };

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
}
interface IContext {
  sidebarState: IProjectContextState;
  setSidebarState: (newState: IProjectContextState) => void;
}

const ProjectContext = createContext<IContext>({
  sidebarState: {},
  setSidebarState: (newState: IProjectContextState) => {},
});
const ProjectProvider: React.FC = children => {
  const [sidebarState, setSidebarState] = useState<IProjectContextState>({
    currProject: '',
    projectAction: '',
  });
  return (
    <ProjectContext.Provider
      value={{ sidebarState, setSidebarState }}
      {...children}
    />
  );
};

export { ProjectContext, ProjectProvider };

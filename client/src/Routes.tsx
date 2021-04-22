import React from 'react';
import { Route, Switch } from 'react-router';
import AuthRoute from './utils/AuthRoute';
import SecureRoute from './utils/SecureRoute';

import Home from './pages/main/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PageNotFound from './pages/other/PageNotFound';
import ProjectBoardCheck from './pages/main/ProjectBoardCheck';
import ProjectSettingsCheck from './pages/main/ProjectSettingsCheck';
import CreateProject from './pages/main/CreateProject';

const Routes: React.FC = () => {
  return (
    <Switch>
      <SecureRoute exact path="/" component={Home} />
      <SecureRoute exact path="/project/create" component={CreateProject} />
      <SecureRoute
        exact
        path="/project/:projectId/"
        component={ProjectBoardCheck}
      />
      <SecureRoute
        path="/project/:projectId/issue/:issueId"
        component={ProjectBoardCheck}
      />
      <SecureRoute
        path="/project/:projectId/create-issue"
        component={ProjectBoardCheck}
      />
      <SecureRoute
        exact
        path="/project/settings/:projectId"
        component={ProjectSettingsCheck}
      />
      <SecureRoute
        path="/project/settings/:projectId/create-issue"
        component={ProjectSettingsCheck}
      />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Routes;

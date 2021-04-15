import React from 'react';
import { Switch } from 'react-router';
import AuthRoute from './utils/AuthRoute';
import SecureRoute from './utils/SecureRoute';

import Home from './pages/main/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const Routes: React.FC = () => {
  return (
    <Switch>
      <SecureRoute exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;

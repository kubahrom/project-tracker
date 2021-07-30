import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../context/auth';
import { ProjectContext } from '../context/project';
import PageNotFound from '../pages/other/PageNotFound';

const SecureSettingsRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useContext(AuthContext);
  const { sidebarState } = useContext(ProjectContext);
  return (
    <Route
      {...rest}
      render={props =>
        !user ? (
          <Redirect to="/login" />
        ) : sidebarState.isAuthor ? (
          <Component {...props} />
        ) : (
          <PageNotFound />
        )
      }
    />
  );
};

export default SecureSettingsRoute;

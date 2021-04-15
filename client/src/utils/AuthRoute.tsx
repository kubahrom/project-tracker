import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../context/auth';

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;

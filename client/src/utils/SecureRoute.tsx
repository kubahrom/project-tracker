import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../context/auth';

const SecureRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default SecureRoute;

import { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

interface IUser {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  token: string;
}

type UserType = IUser | null;

interface IDecodedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  exp: number;
  iat: number;
  token: string;
}

interface IAuth {
  user: UserType;
  login: (userData: IDecodedUser) => void;
  logout: () => void;
}

interface IState {
  user: UserType;
}

interface IAction {
  type: string;
  payload?: any;
}

const InitialState: IState = {
  user: null,
};

const token = localStorage.getItem('jwtToken-project-tracker');

if (token) {
  const decodedToken: IDecodedUser = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken-project-tracker');
  } else {
    InitialState.user = decodedToken;
  }
}

const AuthContext = createContext<IAuth>({
  user: null,
  login: (userDate: IDecodedUser) => {},
  logout: () => {},
});

const authReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = children => {
  const [state, dispatch] = useReducer(authReducer, InitialState);

  const login = (userData: IDecodedUser) => {
    localStorage.setItem('jwtToken-project-tracker', userData.token);
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken-project-tracker');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...children}
    />
  );
};

export { AuthContext, AuthProvider };

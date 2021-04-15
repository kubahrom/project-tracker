import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';

const Home: React.FC = () => {
  const { user }: any = useContext(AuthContext);
  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome {user.email}</h2>
    </div>
  );
};

export default Home;

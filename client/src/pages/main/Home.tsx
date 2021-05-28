import React from 'react';
import YourIssues from '../../components/Home/YourIssues';
import YourProjects from '../../components/Home/YourProjects';

const Home: React.FC = () => {
  return (
    <>
      <YourProjects />
      <YourIssues />
    </>
  );
};

export default Home;

import React from 'react';
import YourIssues from '../../components/Home/YourIssues';
import YourProjects from '../../components/Home/YourProjects';

//TODO: Not showing YourProjects & YourIssues while
// not having a single project or shared Projects

const Home: React.FC = () => {
  return (
    <>
      <YourProjects />
      <YourIssues />
    </>
  );
};

export default Home;

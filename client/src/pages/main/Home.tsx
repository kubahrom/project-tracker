import { ApolloError, useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import NoneProjects from '../../components/Home/NoneProjects';
import YourIssues from '../../components/Home/YourIssues';
import YourProjects from '../../components/Home/YourProjects';
import { GET_PROJECTS } from '../../graphql/projectQuery';
import { useHomeStyles } from '../../styles/muiStyles';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IProject {
  id: string;
  name: string;
  author: IUser;
  shared: IUser[];
  createdAt: string;
  category: string;
}

interface IProjectQuery {
  getProjects: IProject[];
}

const Home: React.FC = () => {
  const classes = useHomeStyles();

  const [getProjects, { data, loading }] = useLazyQuery<IProjectQuery>(
    GET_PROJECTS,
    {
      onError(err: ApolloError) {
        console.log(err);
      },
    }
  );

  const [isMounted, setMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      getProjects();
    }
    return () => {
      setMounted(false);
    };
  }, [isMounted, getProjects]);

  return (
    <>
      {loading ? (
        <div className={classes.loadingSpinnerWrapper}>
          <CircularProgress />
        </div>
      ) : data && data.getProjects.length ? (
        <>
          <YourProjects projects={data.getProjects} />
          <YourIssues />
        </>
      ) : (
        <NoneProjects />
      )}
    </>
  );
};

export default Home;

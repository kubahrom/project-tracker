import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IcachedProjectUsers {
  author: IUser;
  shared: IUser[];
}

const useGetProjectUsers = (projectId?: string) => {
  const [projectUsers, setProjectUsers] = useState<IUser[]>([]);
  const client = useApolloClient();
  const cachedProjectUsers = client.readFragment<IcachedProjectUsers>({
    id: `Project:${projectId}`,
    fragment: gql`
      fragment ProjectUsers on Project {
        author {
          id
          firstName
          lastName
        }
        shared {
          id
          firstName
          lastName
        }
      }
    `,
  });

  useEffect(() => {
    if (cachedProjectUsers)
      setProjectUsers([
        cachedProjectUsers.author,
        ...cachedProjectUsers.shared,
      ]);
  }, [cachedProjectUsers]);

  return projectUsers;
};

export default useGetProjectUsers;

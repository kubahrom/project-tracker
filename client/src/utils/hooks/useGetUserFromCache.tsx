import { gql, useApolloClient } from '@apollo/client';

const useGetUserFromCache = (userId: string) => {
  const client = useApolloClient();
  const cachedUser = client.readFragment({
    id: `User:${userId}`,
    fragment: gql`
      fragment UserFragment on User {
        id
        firstName
        lastName
      }
    `,
  });
  return cachedUser;
};

export default useGetUserFromCache;

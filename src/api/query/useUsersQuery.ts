import { useMemo } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import FilterData from '@/types/FilterData';
import User from '@/types/User';

import { useUsersData } from '../data/useUsersData';

export function useUsersQuery(queryOptions?: {
  filter?: FilterData;
  query?: string | null;
}) {
  const queryClient = useQueryClient();

  const queryKey = ['users'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        return useUsersData();
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  const users = useMemo(() => {
    return queryClient.getQueryData<User[]>(queryKey) || [];
  }, [queryClient, queryKey]);

  const filteredData = useMemo(() => {
    if (!users) return [];

    const filter = queryOptions?.filter;

    if (!filter) return users;

    if (!filter.key || !filter.value) return users;

    const foundUsers = users.filter((user) => {
      if (filter.key === 'plan') {
        return user.plan?.plan === filter.value;
      }

      return user[filter.key as keyof User] === filter.value;
    });

    return foundUsers;
  }, [queryOptions?.filter, users]);

  function setData(newUser: User) {
    queryClient.setQueryData<User[]>(queryKey, (oldData) => {
      if (!oldData) return [newUser];

      const index = oldData.findIndex((user) => user.id === newUser.id);

      if (index !== -1) {
        const updatedData = [...oldData];
        updatedData[index] = { ...updatedData[index], ...newUser };
        return updatedData;
      }

      return [...oldData, newUser];
    });
  }

  return {
    query,
    filteredData,
    reloadQuery,
    setData,
  };
}

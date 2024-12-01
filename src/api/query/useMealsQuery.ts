import { useQuery, useQueryClient } from '@tanstack/react-query';
import useMealsData from '../data/useMealsData';
import Meal from '@/types/Meal';
import { useMemo } from 'react';
import MealFilter from '@/types/enums/MealFilter';

export default function useMealsQuery(filter?: MealFilter) {
  const queryClient = useQueryClient();
  const queryKey = ['meals'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useMealsData();
        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  const mealsData = useMemo(() => {
    return queryClient.getQueryData<Meal[]>(queryKey) || [];
  }, [queryClient, queryKey]);

  // TODO: figure out why it does not update when nutrients are changed.
  const filteredMeals = useMemo(() => {
    if (!mealsData) return [];

    if (!filter || filter === MealFilter.ALL) return mealsData;

    return mealsData.filter((d) => Boolean(d[filter]));
  }, [filter, mealsData]);

  function setData(update: Meal) {
    queryClient.setQueryData(queryKey, (oldData: Meal[] | undefined) => {
      if (!oldData) return [update];

      const updatedData = oldData.map((meal) =>
        meal.id === update.id
          ? {
              ...meal,
              ...update,
              nutrients: {
                ...meal.nutrients,
                ...update.nutrients,
              },
            }
          : meal,
      );

      if (!oldData.some((meal) => meal.id === update.id)) {
        updatedData.push(update);
      }

      return [...updatedData];
    });

    // Ensure `useMemo` picks up changes by refetching mealsData
    queryClient.invalidateQueries({ queryKey, refetchType: 'none' });
  }

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  return {
    filteredMeals,
    query,
    reloadQuery,
    setData,
  };
}

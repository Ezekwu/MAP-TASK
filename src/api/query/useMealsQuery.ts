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

        console.log(response);

        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  const filteredMeals = useMemo(() => {
    if (!query.data) return [];

    if (!filter || filter === MealFilter.ALL) return query.data;

    return query.data.filter((d) => Boolean(d[filter]));
  }, [filter, query.data]);

  function setData(data: Meal) {
    console.log(data);
    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData) return [data];

      const existingMealIndex = oldData.findIndex(
        (meal: any) => meal.id === data.id,
      );

      if (existingMealIndex > -1) {
        const updatedData = [...oldData];

        updatedData[existingMealIndex] = data;

        return updatedData;
      } else {
        return [...oldData, data];
      }
    });
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

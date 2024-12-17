import { useMemo } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import Meal, { MealType } from '@/types/Meal';

import useAvailableMealsData from '../data/useAvailableMealsData';

interface Props {
  // TODO: implement search
  searchQuery?: string | null;
  type?: MealType;
}
export default function useAvailableMealsQuery(props?: Props) {
  const queryClient = useQueryClient();

  const queryKey = ['available-meals'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useAvailableMealsData();

        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  const mealsData = useMemo(() => {
    return queryClient.getQueryData<Meal[]>(queryKey) || [];
  }, [queryClient, queryKey]);

  const meals = useMemo(() => {
    if (!props?.type) return mealsData;

    return mealsData.filter((meal) => meal.mealType === props.type);
  }, [mealsData, props?.type]);

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  return {
    meals,
    query,
    reloadQuery,
  };
}

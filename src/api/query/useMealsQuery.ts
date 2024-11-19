import { useQuery, useQueryClient } from '@tanstack/react-query';
import useMealsData from '../data/useMealsData';
import Meal from '@/types/Meal';

export default function useMealsQuery() {
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
    query,
    reloadQuery,
    setData,
  };
}

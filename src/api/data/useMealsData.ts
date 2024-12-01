import Meal from '@/types/Meal';
import { Api } from '..';

export default function useMealsData(): Promise<Meal[]> {
  return Api.getMeals();
}

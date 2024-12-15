import { Api } from '..';

export default function useAvailableMealsData() {
  return Api.getAvailableMeals();
}

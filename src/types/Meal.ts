export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

export default interface Meal {
  img: any;
  name: string;
  id: string;
  price: number;
  mealType: MealType;
  nutrients: {
    fibre?: number;
    fat?: number;
    kcal?: number;
    protein?: number;
  };
  highCalorie: boolean;
  spotlight?: boolean;
  bestSeller?: boolean;
  soldOut?: boolean;
}

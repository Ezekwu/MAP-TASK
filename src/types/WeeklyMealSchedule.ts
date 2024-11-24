import { MealType } from '@/types/Meal';

export interface MealEntry {
  mealId: string;
  mealType: MealType;
}

export interface DaySchedule {
  day: string;
  meals: {
    [key in MealType]?: MealEntry[];
  };
}

export interface WeeklyMealSchedule {
  id: string;
  name: string;
  days: DaySchedule[];
  createdAt?: Date;
  updatedAt?: Date;
}

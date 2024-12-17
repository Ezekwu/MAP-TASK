import { Dayjs } from 'dayjs';
import { MealType } from './Meal';

export default interface MealSwapDataData {
  day: Dayjs;
  type: MealType;
}

import Meal from '../../types/Meal';

const mealTypeStyling = {
  breakfast: '',
  lunch: '',
  dinner: '',
};

const pastMealTypeStyling = {
  breakfast: '',
  lunch: '',
  dinner: '',
};

interface Props {
  type: keyof typeof mealTypeStyling;
  meal: Meal;
  isPast: boolean;
}
export default function MealScheduleCard(props: Props) {
  return <div className={`rounded p-3`}></div>;
}

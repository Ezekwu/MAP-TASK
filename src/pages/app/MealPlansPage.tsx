import { mealPlans } from "@/api/mock/mealPlans";
import BasePage from "@/components/layout/BasePage";
import MealPlanDetails from '@/components/meals/MealPlanDetails';

export default function MealPlansPage() {
  const pageMetaData = {
    title: 'Meal plans',
  };

  console.log(mealPlans);
  const obj = {
    name: 'Weekday',
    price: 380000,
    meals: ['Breakfasttt', 'Lunch', 'Dinner'],
    duration: '5 Days in a week, 20 Days in total',
  
  }

  return (
    <BasePage metadata={pageMetaData}>
      <p className="text-sm text-secondary-1500">
        You’re currently subscribed to the{' '}
        <span className="font-bold">“All inclusive”</span> plan
      </p>
      <MealPlanDetails mealPlan={mealPlans[2]} />
      <section>
        <h3 className="font-semibold text-secondary-1500 text-xl mb-1">Meal catalogue</h3>
        <p className="text-secondary-1600 text-sm max-w-md">
          Here you see all the meals we have available, and you can order
          outside your calendar schedule.
        </p>
      </section>
    </BasePage>
  );
}
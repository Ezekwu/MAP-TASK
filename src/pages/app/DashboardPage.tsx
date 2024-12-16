import { meals } from '@/api/mock/meals';
import WeekDisplay from '@/components/calendar/WeekDisplay';
import BasePage from '@/components/layout/BasePage';
import MealCard from '@/components/meals/MealCard';
import MealScheduleCard from '@/components/meals/MealScheduleCard';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const pagenavDetails = {
    title: 'Hello, Henry! 👋',
    subtitle: 'Begin your journey to better health today',
  };

  const weekText = useMemo(() => {
    const startOfWeek = dayjs().startOf('week');
    const endOfWeek = dayjs().endOf('week');

    const formattedStart = startOfWeek.format('MMMM D');
    const formattedEnd = endOfWeek.format('D, YYYY');

    return `${formattedStart}-${formattedEnd}`;
  }, [dayjs()]);

  return (
    <BasePage navDetails={pagenavDetails}>
      <header className="flex justify-between flex-col sm:flex-row gap-2">
        <div className="text-sm">
          Here are you upcoming meals for the week <br />(
          <span className="text-typography-subtitle font-bold">{weekText}</span>
          ) according to your calendar
        </div>
        <Link to="/calendar">
          <UiButton variant="secondary">
            <UiIcon icon="Calendar" />
            See full calendar
          </UiButton>
        </Link>
      </header>
      <div className="border-b-dashed pb-8 overflow-hidden">
        <WeekDisplay>
          <></>
          {/* <MealScheduleCard meal={meals[0]} type="breakfast" />
          <MealScheduleCard meal={meals[1]} type="lunch" />
          <MealScheduleCard meal={meals[2]} type="dinner" /> */}
        </WeekDisplay>
      </div>
      <div>
        <div className="text-typography-base text-xs sm:text-sm font-medium mb-4">
          Today’s Faves
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-8">
          {meals.map((meal) => (
            <></>
            // <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </BasePage>
  );
}

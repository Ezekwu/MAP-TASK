import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useMealsQuery from '@/api/query/useMealsQuery';

import { MealType } from '@/types/Meal';
import { WeeklyMealSchedule, MealEntry } from '@/types/WeeklyMealSchedule';

import UiButton from '../ui/UiButton';
import UiLoader from '../ui/UiLoader';
import UiSearchInput from '../ui/UiSearchInput';

import MealItem from './MealItem';

interface MealEntryWithDay extends MealEntry {
  day: string;
}

interface Props {
  mealType?: MealType;
  weeklyMealSchedule?: WeeklyMealSchedule;
  onDone: (data: WeeklyMealSchedule) => void;
  goBack: () => void;
}

export default function SelectMeals({
  mealType = MealType.BREAKFAST,
  weeklyMealSchedule = { id: '', name: '', days: [] },
  onDone,
  goBack,
}: Props) {
  const { t } = useTranslation();

  const [query, setQuery] = useState<string | null>(null);

  const {
    filteredMeals: data,
    query: { isLoading },
  } = useMealsQuery({ searchQuery: query });

  const previouslyAssignedMeals: MealEntryWithDay[] =
    weeklyMealSchedule.days.flatMap(
      (day) =>
        day.meals[mealType]?.map((meal) => ({
          ...meal,
          day: day.day,
        })) || [],
    );

  const [selectedMeals, setSelectedMeals] = useState<MealEntryWithDay[]>([]);

  useEffect(() => {
    setSelectedMeals((prevSelectedMeals) => {
      const existingMealIds = prevSelectedMeals.map((meal) => meal.mealId);
      return [
        ...previouslyAssignedMeals.filter(
          (meal) => !existingMealIds.includes(meal.mealId),
        ),
        ...prevSelectedMeals,
      ];
    });
  }, [mealType, weeklyMealSchedule]);

  function onSelectMeal(mealId: string) {
    setSelectedMeals((prev) => {
      if (!prev.some((meal) => meal.mealId === mealId)) {
        return [...prev, { mealId, mealType, day: '_' }];
      }
      return prev;
    });
  }

  function onRemoveMeal(mealId: string) {
    setSelectedMeals((prev) => prev.filter((meal) => meal.mealId !== mealId));
  }

  function isMealSelected(mealId: string) {
    return selectedMeals.some((meal) => meal.mealId === mealId);
  }

  function next() {
    const updatedDays = [...weeklyMealSchedule.days];

    for (const meal of previouslyAssignedMeals) {
      const daySchedule = updatedDays.find((day) => day.day === meal.day);
      if (daySchedule) {
        daySchedule.meals[mealType] = daySchedule.meals[mealType] || [];
        if (
          !daySchedule.meals[mealType]?.some((m) => m.mealId === meal.mealId)
        ) {
          daySchedule.meals[mealType]?.push({
            mealId: meal.mealId,
            mealType: meal.mealType,
          });
        }
      }
    }

    const unassignedMeals = selectedMeals.filter((meal) => meal.day === '_');
    const unassignedDaySchedule = updatedDays.find((day) => day.day === '');

    if (unassignedMeals.length > 0) {
      if (unassignedDaySchedule) {
        unassignedDaySchedule.meals[mealType] = [
          ...(unassignedDaySchedule.meals[mealType] || []),
          ...unassignedMeals.map((meal) => ({
            mealId: meal.mealId,
            mealType: meal.mealType,
          })),
        ];
      } else {
        updatedDays.push({
          day: '',
          meals: {
            [MealType.BREAKFAST]:
              mealType === MealType.BREAKFAST ? unassignedMeals : [],
            [MealType.LUNCH]:
              mealType === MealType.LUNCH ? unassignedMeals : [],
            [MealType.DINNER]:
              mealType === MealType.DINNER ? unassignedMeals : [],
          },
        });
      }
    }

    const updatedMeals = updatedDays.map((day) => {
      day.meals[mealType] = day.meals[mealType]?.map((meal) => ({
        ...meal,
        day:
          (meal as MealEntryWithDay).day === '_'
            ? ''
            : (meal as MealEntryWithDay).day,
      }));
      return day;
    });

    const updatedSchedule: WeeklyMealSchedule = {
      ...weeklyMealSchedule,
      days: updatedMeals,
    };

    onDone(updatedSchedule);
  }

  return (
    <div>
      <div className="mx-8 pt-8">
        <UiSearchInput
          placeholder={t('placeholders.search-meals')}
          onSearch={setQuery}
        />
      </div>

      <p className="text-sm text-[#585B5A] mx-8 py-2">
        {t('modals.set-schedule.select-weekly-meals', { mealType })}
      </p>
      <div className="max-h-[55vh] overflow-auto grid gap-4">
        {isLoading && <UiLoader />}
        {data.map((meal) => (
          <MealItem
            meal={meal}
            onSelect={() => onSelectMeal(meal.id)}
            onRemove={() => onRemoveMeal(meal.id)}
            isSelected={isMealSelected(meal.id)}
            key={meal.id}
          />
        ))}
      </div>
      <div className="p-4 border-t border-tertiary-700 grid grid-cols-2 gap-2">
        <UiButton
          block
          variant="tertiary-outlined"
          size="lg"
          disabled={!selectedMeals.length}
          onClick={goBack}
        >
          {t('actions.back')}
        </UiButton>
        <UiButton
          block
          variant="tertiary"
          size="lg"
          disabled={!selectedMeals.length}
          onClick={next}
        >
          {t('actions.set-date')}
        </UiButton>
      </div>
    </div>
  );
}

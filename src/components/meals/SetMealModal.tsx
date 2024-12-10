import { Api } from '@/api';
import useToggle from '@/hooks/useToggle';
import useObjectState from '@/hooks/useObjectState';
import Meal, { MealType } from '@/types/Meal';
import Cloudinary from '@/utils/Cloudinary';
import { generateUuid, isFile } from '@/utils/helpers';
import SetMealSchema from '@/utils/schemas/SetMealSchema';
import { useEffect, useState } from 'react';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiImageUploadWithView from '../ui/UiImageUploadWithView';
import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';
import UiSelect from '../ui/UiSelect';
import UiSelectableTags from '../ui/UiSelectableTags';
import UiSwitch from '../ui/UiSwitch';
import { useTranslation } from 'react-i18next';
import UiField from '../ui/UiField';

interface Props {
  isOpen: boolean;
  meal?: Meal | null;
  onClose: () => void;
  onDone: (data: Meal) => void;
}
export default function SetMealModal(props: Props) {
  const { t } = useTranslation();

  const loading = useToggle(false);

  const defaultMeal = {
    id: '',
    name: '',
    img: null,
    // Default price because that's the most common price on our catalogue. It could be changed later on to something else if the admin decides to input a different price for the meal
    price: 7000,
    mealType: MealType.BREAKFAST,
    nutrients: {
      protein: undefined,
      fat: undefined,
      fibre: undefined,
      kcal: undefined,
    },
    spotlight: false,
    highCalorie: false,
    bestSeller: false,
    soldOut: false,
  };

  type Nutrient = keyof typeof formData.value.nutrients;

  const formData = useObjectState(props.meal || defaultMeal);

  const [availableNutrients, setAvailableNutrients] = useState<Nutrient[]>([]);

  const calorieClassOptions = [
    {
      label: t('options.high-calorie'),
      value: true,
    },
    {
      label: t('options.low-calorie'),
      value: false,
    },
  ];

  const nutrients = [
    {
      label: t('options.fibre'),
      value: 'fibre',
    },
    {
      label: t('options.fat'),
      value: 'fat',
    },
    {
      label: t('options.protein'),
      value: 'protein',
    },
    {
      label: t('options.calories'),
      value: 'kcal',
    },
  ];

  const mealTypeOptions = [
    {
      label: t('options.breakfast'),
      value: MealType.BREAKFAST,
    },
    {
      label: t('options.lunch'),
      value: MealType.LUNCH,
    },
    {
      label: t('options.dinner'),
      value: MealType.DINNER,
    },
  ];

  async function onSubmit() {
    try {
      loading.on();

      let img = formData.value.img;

      if (isFile(formData.value.img)) {
        img = await Cloudinary.upload(formData.value.img);
      }

      const nutrients = Object.fromEntries(
        Object.entries(formData.value.nutrients).filter(([key, value]) =>
          Boolean(value),
        ),
      );

      const data = {
        ...formData.value,
        id: formData.value.id || generateUuid(),
        img,
        nutrients,
        inStock: !formData.value.soldOut,
      };

      await Api.setMeal(data);

      props.onDone(data);
    } catch (err) {
      console.error(err);
    } finally {
      loading.off();
    }
  }

  function hasNutrient(nutrient: Nutrient) {
    return availableNutrients.includes(nutrient);
  }

  useEffect(() => {
    const nutrients = props.meal?.nutrients;

    if (!nutrients) return;

    const previouslySetKeys = Object.keys(nutrients).filter((key) =>
      Boolean(nutrients[key as Nutrient]),
    );

    setAvailableNutrients(previouslySetKeys as Nutrient[]);
  }, [props.meal]);

  return (
    <UiModal
      title="Create meal"
      isOpen={props.isOpen}
      alignRight
      onClose={props.onClose}
    >
      <UiForm
        formData={formData.value}
        schema={SetMealSchema}
        onSubmit={onSubmit}
      >
        {({ errors }) => (
          <div className="grid p-8">
            <div className="border-b-dashed pb-8 grid gap-4">
              <UiInput
                name="name"
                label={t('fields.meal-name')}
                error={errors.name}
                placeholder="e.g Potatoes with minced beef and fried eggs"
                value={formData.value.name}
                onChange={formData.set}
              />
              <div className="grid grid-cols-2 gap-4">
                <UiInput
                  name="price"
                  label={t('fields.price-of-meal')}
                  error={errors.price}
                  value={formData.value.price}
                  onChange={formData.set}
                />
                <UiSelect
                  name="mealType"
                  label={t('fields.meal-type')}
                  options={mealTypeOptions}
                  error={errors.mealType}
                  value={formData.value.mealType}
                  onChange={formData.set}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 border-b-dashed py-8 mb-8">
              <UiField error={errors.img}>
                <UiImageUploadWithView
                  name="img"
                  value={formData.value.img}
                  onChange={formData.set}
                />
              </UiField>
              <div>
                <div className="border-b-dashed pb-4 mb-4">
                  <UiSwitch
                    label={t('fields.meal-status')}
                    offLabel="Sold Out"
                    onLabel="In Stock"
                    value={Boolean(!formData.value.soldOut)}
                    onChange={(value) =>
                      formData.set({ name: 'soldOut', value: !value })
                    }
                  />
                </div>
                <UiSelect
                  label={t('fields.meal-class')}
                  placeholder=""
                  name="highCalorie"
                  onChange={formData.set}
                  value={formData.value.highCalorie}
                  options={calorieClassOptions}
                />
              </div>
            </div>
            <UiSelectableTags
              label={t('fields.nutrients-of-meal')}
              tags={nutrients}
              value={availableNutrients}
              onChange={(e) => setAvailableNutrients(e as Nutrient[])}
            />
            <div className="my-8 grid gap-4">
              {availableNutrients.map((nutrient) => (
                <UiInput
                  name={`nutrients.${nutrient}`}
                  key={nutrient}
                  value={formData.value.nutrients[nutrient] || ''}
                  label={t('fields.how-many', {
                    text:
                      nutrient === 'kcal'
                        ? 'Calories'
                        : `g of ${
                            nutrient.charAt(0).toUpperCase() + nutrient.slice(1)
                          }`,
                  })}
                  type="number"
                  onChange={formData.setDeep}
                />
              ))}
            </div>
            <div className="mt-4">
              <UiButton size="lg" block loading={loading.value}>
                Create Meal
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}

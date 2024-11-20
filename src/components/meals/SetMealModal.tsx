import { Api } from '@/Api';
import useBooleanState from '@/hooks/useBooleanState';
import useObjectState from '@/hooks/useObjectState';
import Meal from '@/types/Meal';
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

interface Props {
  isOpen: boolean;
  meal?: Meal | null;
  onClose: () => void;
  onDone: (data: Meal) => void;
}
export default function SetMealModal(props: Props) {
  const loading = useBooleanState(false);

  const defaultMeal = {
    id: '',
    name: '',
    img: null,
    // Default price because that's the most common price on our catalogue. It could be changed later on to something else if the admin decides to input a different price for the meal
    price: 7000,
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
      label: 'High Calorie',
      value: true,
    },
    {
      label: 'Low Calorie',
      value: true,
    },
  ];

  const nutrients = [
    {
      label: 'Fibre',
      value: 'fibre',
    },
    {
      label: 'Fat',
      value: 'fat',
    },
    {
      label: 'Protein',
      value: 'protein',
    },
    {
      label: 'Calories(kcal)',
      value: 'kcal',
    },
  ];

  async function onSubmit() {
    try {
      loading.on();

      let img = formData.value.img;

      if (isFile(formData.value.img)) {
        img = await Cloudinary.upload(formData.value.img);
      }

      // TODO: handle nutrients when no nutrient was added. make it compulsory
      const data = {
        ...formData.value,
        id: formData.value.id || generateUuid(),
        img,
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
          <div className="grid">
            <div className="border-b-dashed pb-8 grid gap-4">
              <UiInput
                name="name"
                label="Meal Name"
                error={errors.name}
                placeholder="e.g Potatoes with minced beef and fried eggs"
                value={formData.value.name}
                onChange={formData.set}
              />
              <UiInput
                name="price"
                label="Price of Meal"
                error={errors.price}
                value={formData.value.price}
                onChange={formData.set}
              />
            </div>
            <div className="grid grid-cols-2 gap-10 border-b-dashed py-8 mb-8">
              <UiImageUploadWithView
                name="img"
                value={formData.value.img}
                onChange={formData.set}
              />
              <div>
                <div className="border-b-dashed pb-4 mb-4">
                  <UiSwitch
                    label="Meal status"
                    offLabel="Sold Out"
                    onLabel="In Stock"
                    value={Boolean(!formData.value.soldOut)}
                    onChange={(value) =>
                      formData.set({ name: 'soldOut', value: !value })
                    }
                  />
                </div>
                <UiSelect
                  label="Meal class"
                  placeholder=""
                  name="highCalorie"
                  onChange={formData.set}
                  value={formData.value.highCalorie}
                  options={calorieClassOptions}
                />
              </div>
            </div>
            <UiSelectableTags
              label="What nutrients does the meal contain?"
              tags={nutrients}
              value={availableNutrients}
              onChange={(e) => setAvailableNutrients(e as Nutrient[])}
            />
            <div className="my-8 grid gap-4">
              {hasNutrient('protein') && (
                <UiInput
                  suffixNode="g"
                  label="How many g of protein?"
                  name="nutrients.protein"
                  value={formData.value.nutrients.protein || ''}
                  onChange={formData.setDeep}
                />
              )}
              {hasNutrient('fat') && (
                <UiInput
                  suffixNode="g"
                  label="How many g of fat?"
                  name="nutrients.fat"
                  value={formData.value.nutrients.fat || ''}
                  onChange={formData.setDeep}
                />
              )}
              {hasNutrient('fibre') && (
                <UiInput
                  suffixNode="g"
                  label="How many g of fibre?"
                  name="nutrients.fibre"
                  value={formData.value.nutrients.fibre || ''}
                  onChange={formData.setDeep}
                />
              )}
              {hasNutrient('kcal') && (
                <UiInput
                  suffixNode="kcal"
                  label="How many calories?"
                  name="nutrients.kcal"
                  value={formData.value.nutrients.kcal || ''}
                  onChange={formData.setDeep}
                />
              )}
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

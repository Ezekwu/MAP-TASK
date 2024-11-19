import { Api } from '@/Api';
import useBooleanState from '@/hooks/useBooleanState';
import useObjectState from '@/hooks/useObjectState';
import Meal from '@/types/Meal';
import Cloudinary from '@/utils/Cloudinary';
import { generateUuid, isFile } from '@/utils/helpers';
import SetMealSchema from '@/utils/schemas/SetMealSchema';
import UiButton from '../ui/UiButton';
import UiField from '../ui/UiField';
import UiForm from '../ui/UiForm';
import UiImageUploadWithView from '../ui/UiImageUploadWithView';
import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';
import UiMultiInput from '../ui/UiMultiInput';
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
    nutrients: [''],
    inStock: true,
    spotlight: false,
    highCalorie: false,
    bestSeller: false,
    soldOut: false,
  };

  const formData = useObjectState(props.meal || defaultMeal);

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
          <div className="grid gap-3">
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
            <UiField label="Display image" error={errors.img}>
              <UiImageUploadWithView
                name="img"
                value={formData.value.img}
                onChange={formData.set}
              />
            </UiField>
            <div className="grid grid-cols-5 gap-x-5 ">
              <UiSwitch
                label="High Calorie"
                value={Boolean(formData.value.highCalorie)}
                onChange={(value) =>
                  formData.set({ name: 'highCalorie', value })
                }
              />
              <UiSwitch
                label="In Stock"
                value={Boolean(formData.value.inStock)}
                onChange={(value) => formData.set({ name: 'inStock', value })}
              />
              <UiSwitch
                label="Spotlight"
                value={Boolean(formData.value.spotlight)}
                onChange={(value) => formData.set({ name: 'spotlight', value })}
              />
              <UiSwitch
                label="Best Seller"
                value={Boolean(formData.value.bestSeller)}
                onChange={(value) =>
                  formData.set({ name: 'bestSeller', value })
                }
              />
              <UiSwitch
                label="Sold Out"
                value={Boolean(formData.value.soldOut)}
                onChange={(value) => formData.set({ name: 'soldOut', value })}
              />
            </div>
            <UiMultiInput
              value={formData.value.nutrients}
              label="Nutrients"
              name="nutrients"
              placeholder="Eg. 400 kcal or 10g FAT"
              onChange={formData.set}
            />
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

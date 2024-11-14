import useObjectState from '@/hooks/useObjectState';
import Meal from '@/types/Meal';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';
import UiImageView from '../ui/UiImageView';
import UiImageUploadWithView from '../ui/UiImageUploadWithView';

interface Props {
  isOpen: boolean;
  meal?: Meal;
  onClose: () => void;
}
export default function SetMealModal(props: Props) {
  const defaultMeal = {
    name: '',
    img: null,
    // Default price because that's the most common price on our catalogue. It could be changed later on to something else if the admin decides to input a different price for the meal
    price: 7000,
    nutrients: [],
    inStock: true,
    spotlight: false,
    highCalorie: false,
    isBestSeller: false,
  };

  const formData = useObjectState(defaultMeal);

  function onSubmit() {}

  return (
    <UiModal
      title="Create meal"
      isOpen={props.isOpen}
      alignRight
      onClose={props.onClose}
    >
      <UiForm formData={formData.value} onSubmit={onSubmit}>
        {({ errors }) => (
          <div className="grid gap-3">
            <UiInput
              name="name"
              label="Meal Name"
              placeholder="e.g Potatoes with minced beef and fried eggs"
              value={formData.value.name}
              onChange={formData.set}
            />
            <UiInput
              name="price"
              label="Price of Meal"
              value={formData.value.price}
              onChange={formData.set}
            />
            <UiImageUploadWithView
              name="img"
              value={formData.value.img}
              onChange={formData.set}
            />
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}

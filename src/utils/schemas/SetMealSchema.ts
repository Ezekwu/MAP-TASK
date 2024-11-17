import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  name: Yup.string().required(isRequiredMessage),
  price: Yup.number().required(isRequiredMessage),
  img: Yup.mixed().required(isRequiredMessage),
});

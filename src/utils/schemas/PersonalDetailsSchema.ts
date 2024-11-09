import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  first_name: Yup.string().required(isRequiredMessage),
  last_name: Yup.string().required(isRequiredMessage),
  phone_numner: Yup.string().required(isRequiredMessage),
  home_adress: Yup.string().required(isRequiredMessage),
  profile_img: Yup.string().required(isRequiredMessage),
});

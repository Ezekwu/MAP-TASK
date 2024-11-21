import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  first_name: Yup.string().required(isRequiredMessage),
  last_name: Yup.string().required(isRequiredMessage),
  phone_number: Yup.string().required(isRequiredMessage),
  home_adress: Yup.string().required(isRequiredMessage),
  local_government: Yup.string().required(isRequiredMessage),
});

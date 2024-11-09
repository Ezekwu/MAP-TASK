import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  password: Yup.string().required(isRequiredMessage).min(8),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(isRequiredMessage),
});

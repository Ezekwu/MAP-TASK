import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  plan: Yup.string().required(isRequiredMessage),
});

import * as Yup from 'yup';

export default Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone_number: Yup.string().required('Phone number is required'),
  goals: Yup.string().required('Your goal is a required field'),
});

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecordUserQuery, useRegisterQuery } from '../../api/queries';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import UiSelect from '../../components/ui/UiSelect';
import OnChangeParams from '../../types/OnChangeParams';
import User from '../../types/User';
import RegistrationSchema from '../../utils/schemas/RegistrationSchema';

export default function RegistrationPage() {
  const { request: registerUserRequest, isLoading: registerUserIsLoading } =
    useRegisterQuery();
  const { request: recordUserRequest, isLoading: recordUserIsLoading } =
    useRecordUserQuery();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const roleOptions = [
    {
      label: 'Hr',
      value: 'hr',
    },
    {
      label: 'Applicant',
      value: 'applicant',
    },
  ];
  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  async function registerUser() {
    try {
      const { uid } = (await registerUserRequest({
        email: formData.email,
        password: formData.password,
      })) as { uid: string };
      const { password, ...data } = formData;
      const userData: User = {
        _id: uid,
        ...data,
      } as User;
      recordUserRequest(userData).then(() => {
        if (userData.role !== 'hr') {
          alert('Applied successfully');
          return;
        }
        localStorage.setItem('uid', userData._id);
        window.location.reload();
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1 className="my-8 font-bold text-lg">Nice to e-meet you!</h1>
      <UiForm
        formData={formData}
        schema={RegistrationSchema}
        onSubmit={registerUser}
      >
        {({ errors }) => (
          <div className="grid gap-4">
            <UiInput
              placeholder="Enter your name"
              label="Name"
              value={formData.name}
              name="name"
              error={errors.name}
              onChange={onChange}
            />
            <UiInput
              placeholder="Enter your email"
              label="Email"
              value={formData.email}
              name="email"
              error={errors.email}
              onChange={onChange}
            />
            <UiSelect
              label="Role"
              value={formData.role}
              options={roleOptions}
              name="role"
              error={errors.role}
              onChange={onChange}
            />
            <UiInput
              placeholder="Enter your Password"
              label="Password"
              value={formData.password}
              name="password"
              type="password"
              error={errors.password}
              onChange={onChange}
            />
            <UiButton
              block
              loading={registerUserIsLoading || recordUserIsLoading}
            >
              Submit
            </UiButton>
            <p className="text-sm text-center">
              Already a member?{' '}
              <Link to="/auth/login" className="text-primary underline">
                Login
              </Link>
            </p>
          </div>
        )}
      </UiForm>
    </>
  );
}

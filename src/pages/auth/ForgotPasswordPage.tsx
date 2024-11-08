import { useState } from 'react';
import { Link } from 'react-router-dom';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import OnChangeParams from '../../types/OnChangeParams';
import ForgotPasswordSchema from '../../utils/schemas/ForgotPasswordSchema';

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: '',
  });

  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  async function loginUser() {}

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-8 sm:mb-10">
        Forgot password?
      </h2>
      <UiForm
        formData={formData}
        schema={ForgotPasswordSchema}
        onSubmit={loginUser}
      >
        {({ errors }) => (
          <div className="grid gap-5">
            <UiInput
              placeholder="Enter email address"
              value={formData.email}
              label="Email"
              name="email"
              error={errors.email}
              onChange={onChange}
            />
            <div className="mt-4">
              <UiButton variant="primary" block>
                Send recovery link
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
      <p className="text-base text-center mt-[22px] text-gray-1000 font-medium">
        Don't have an account?{' '}
        <Link to="/auth/join" className="text-primary font-bold">
          Sign up
        </Link>
      </p>
    </div>
  );
}

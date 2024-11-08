import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginUserQuery } from '../../api/queries';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import OnChangeParams from '../../types/OnChangeParams';
import LoginSchema from '../../utils/schemas/LoginSchema';
import UiIcon from '../../components/ui/UiIcon';
import SignUpSchema from '../../utils/schemas/SignUpSchema';

export default function LoginPage() {
  const { request, isLoading } = useLoginUserQuery();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
        Ready to Eatrite?
      </h2>
      <UiForm formData={formData} schema={SignUpSchema} onSubmit={loginUser}>
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
            <UiInput
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              name="password"
              label="Password"
              error={errors.password}
              onChange={onChange}
            />
            <p className="text-xs">
              Forgot password?{' '}
              <Link
                to="/auth/forgot-password"
                className="text-primary font-bold"
              >
                Reset password
              </Link>
            </p>
            <div className="mt-5">
              <UiButton variant="primary" block>
                Submit
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

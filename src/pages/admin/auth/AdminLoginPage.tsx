import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiInput from '@/components/ui/UiInput';
import useBooleanState from '@/hooks/useBooleanState';
import useObjectState from '@/hooks/useObjectState';
import SignUpSchema from '@/utils/schemas/SignUpSchema';
import { Link } from 'react-router-dom';

export default function AdminLoginPage() {
  const formData = useObjectState({
    email: '',
    password: '',
  });

  const loading = useBooleanState(false);

  async function loginUser() {}

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-8 sm:mb-10">
        Ready to Eatrite?
      </h2>
      <UiForm
        formData={formData.value}
        schema={SignUpSchema}
        onSubmit={loginUser}
      >
        {({ errors }) => (
          <div className="grid gap-5">
            <UiInput
              placeholder="Enter email address"
              value={formData.value.email}
              label="Email"
              name="email"
              error={errors.email}
              onChange={formData.set}
            />
            <UiInput
              placeholder="Enter your password"
              type="password"
              value={formData.value.password}
              name="password"
              label="Password"
              error={errors.password}
              onChange={formData.set}
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
              <UiButton size="lg" rounded="md" block loading={loading.value}>
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

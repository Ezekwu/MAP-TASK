import useObjectState from '@/hooks/useObjectState';
import { Link } from 'react-router-dom';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import ResetPasswordSchema from '../../utils/schemas/ResetPasswordSchema';

export default function ResetPasswordPage() {
  const formData = useObjectState({
    password: '',
    confirm_password: '',
  });

  async function resetPassword() {
    console.log(formData.value);
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-8 sm:mb-10">
        Reset password
      </h2>
      <UiForm
        formData={formData.value}
        schema={ResetPasswordSchema}
        onSubmit={resetPassword}
      >
        {({ errors }) => (
          <div className="grid gap-5">
            <UiInput
              label="New password"
              placeholder="Enter new password"
              value={formData.value.password}
              name="password"
              type="password"
              error={errors.password}
              onChange={formData.set}
            />
            <UiInput
              label="Confirm password"
              placeholder="Confirm new password"
              value={formData.value.confirm_password}
              name="confirm_password"
              type="password"
              error={errors.confirm_password}
              onChange={formData.set}
            />
            <div className="mt-5">
              <UiButton size="lg" rounded="md" variant="primary" block>
                Reset password
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

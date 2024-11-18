import { Api } from '@/api';
import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';
import { Link } from 'react-router-dom';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import ForgotPasswordSchema from '../../utils/schemas/ForgotPasswordSchema';

export default function ForgotPasswordForm() {
  const formData = useObjectState({
    email: '',
  });
  const loading = useToggle();

  async function sendResetPasswordEmail() {
    loading.on();
    Api.sendPasswordResetEmail(formData.value.email)
      .then(() =>
        //TODO: IMPLEMENT TOAST
        console.log('password reset link has been sent to your email'),
      )
      .finally(() => loading.off());
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-8 sm:mb-10">
        Forgot password?
      </h2>
      <UiForm
        formData={formData.value}
        schema={ForgotPasswordSchema}
        onSubmit={sendResetPasswordEmail}
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
            <div className="mt-4">
              <UiButton
                size="lg"
                rounded="md"
                variant="primary"
                block
                loading={loading.value}
              >
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

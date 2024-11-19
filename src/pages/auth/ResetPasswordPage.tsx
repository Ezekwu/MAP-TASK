import { Api } from '@/api';
import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';
import { FirebaseError } from 'firebase/app';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import ResetPasswordSchema from '../../utils/schemas/ResetPasswordSchema';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const formData = useObjectState({
    password: '',
    confirm_password: '',
  });
  const actionCode = searchParams.get('oobCode') || '';
  const loading = useToggle();

  async function resetPassword() {
    try {
      loading.on();

      await Api.resetPassword(actionCode, formData.value.password);
      console.log('password has been reset');
      //TODO: IMPLEMENT TOAST

      // TODO: After resetting send the person to logo
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (
        firebaseError.message === 'Firebase: Error (auth/expired-action-code).'
      ) {
        console.log('Code has expired, send request again');
      }
    } finally {
      loading.off();
    }
  }

  async function verifyPasswordResetCode() {
    try {
      await Api.verifyPasswordResetCode(actionCode);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (
        firebaseError.message === 'Firebase: Error (auth/expired-action-code).'
      ) {
        console.log('Code has expired, send request again');
      }
    }
  }

  useEffect(() => {
    verifyPasswordResetCode();
  }, [actionCode]);

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
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-bold">
          Sign in
        </Link>
      </p>
    </div>
  );
}

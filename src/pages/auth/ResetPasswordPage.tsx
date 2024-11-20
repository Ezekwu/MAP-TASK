import { FirebaseError } from 'firebase/app';
import { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Api } from '@/api';

import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';

import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiInput from '@/components/ui/UiInput';

import ResetPasswordSchema from '@/utils/schemas/ResetPasswordSchema';
import { Toast } from '@/utils/toast';

// ---

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

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

      navigate('/auth/login');
    } catch (error) {
      const firebaseError = error as FirebaseError;

      const msg = t(`errors.${firebaseError.code}`, t('errors.default'));    

      Toast.success({ msg });
    } finally {
      loading.off();
    }
  }

  async function verifyPasswordResetCode() {
    try {
      await Api.verifyPasswordResetCode(actionCode);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const msg = t(`errors.${firebaseError.code}`, t('errors.default'));

      Toast.error({ msg });
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

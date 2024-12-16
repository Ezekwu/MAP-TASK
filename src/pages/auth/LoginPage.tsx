import { Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Api } from '@/api';

import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiInput from '@/components/ui/UiInput';
import UiIcon from '@/components/ui/UiIcon';
import UiOrSeperator from '@/components/ui/UiOrSeperator';

import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';

import TokenHandler from '@/utils/TokenHandler';
import EmailAndPasswordSchema from '@/utils/schemas/EmailAndPasswordSchema';
import { Toast } from '@/utils/toast';
import { Collections } from '@/api/firebase';

// ---

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formData = useObjectState({
    email: '',
    password: '',
  });

  const loading = useToggle();

  async function loginWithEmail() {
    try {
      loading.on();

      const user = await Api.signInWithEmailAndPassword(formData.value);

      console.log(user);

      TokenHandler.setToken(user.uid);

      const doesUserExist = await Api.doesDocumentExist(
        Collections.USERS,
        user.uid,
      );

      if (doesUserExist) {
        window.location.reload();
        return;
      }

      navigate('/auth/personal-details');
    } catch (error) {
      const firebaseError = error as FirebaseError;

      const msg = t(`errors.${firebaseError.code}`, t('errors.default'));

      Toast.error({ msg });
    } finally {
      loading.off();
    }
  }

  async function loginWithGoogle() {
    try {
      const user = await Api.signInWithGoogle();
      console.log(user);

      TokenHandler.setToken(user.uid);

      const doesUserExist = await Api.doesDocumentExist(
        Collections.USERS,
        user.uid,
      );

      if (doesUserExist) {
        navigate('/');
      } else {
        navigate('/auth/personal-details');
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;

      const msg = t(`errors.${firebaseError.code}`, t('errors.default'));

      Toast.error({ msg });
    }
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-8 sm:mb-10">
        Ready to Eatrite?
      </h2>
      <div className="flex flex-col gap-8">
        <UiButton
          onClick={loginWithGoogle}
          rounded="md"
          size="lg"
          variant="tertiary-outlined"
          block
        >
          <UiIcon size="20" icon="Google" />
          <p className="text-sm">Sign in with Google</p>
        </UiButton>
        <UiOrSeperator />
        <UiForm
          formData={formData.value}
          schema={EmailAndPasswordSchema}
          onSubmit={loginWithEmail}
        >
          {({ errors }) => (
            <div className="grid gap-5">
              <UiInput
                placeholder="Enter email address"
                value={formData.value.email}
                label={t('fields.email')}
                name="email"
                error={errors.email}
                onChange={formData.set}
              />
              <UiInput
                placeholder="Enter your password"
                type="password"
                value={formData.value.password}
                name="password"
                label={t('fields.password')}
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
                <UiButton loading={loading.value} size="lg" rounded="md" block>
                  Submit
                </UiButton>
              </div>
            </div>
          )}
        </UiForm>
      </div>
      <p className="text-base text-center mt-[22px] text-gray-1000 font-medium">
        Don't have an account?{' '}
        <Link to="/auth/join" className="text-primary font-bold">
          Sign up
        </Link>
      </p>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Api } from '@/api';

import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiIcon from '@/components/ui/UiIcon';
import UiInput from '@/components/ui/UiInput';
import UiOrSeperator from '@/components/ui/UiOrSeperator';
import useToggle from '@/hooks/useToggle';
import useObjectState from '@/hooks/useObjectState';

import EmailAndPasswordSchema from '@/utils/schemas/EmailAndPasswordSchema';
import { Toast } from '@/utils/toast';

// ---

export default function SignUpForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formData = useObjectState({
    email: '',
    password: '',
  });

  const loading = useToggle();

  async function signUpWithEmailAndPassword() {
    try {
      loading.on();
      await Api.createUserWithEmailAndPassword({
        email: formData.value.email,
        password: formData.value.password,
      });

      navigate('/auth/personal-details');
    } catch (error) {
      const firebaseError = error as FirebaseError;

      const msg = t(`errors.${firebaseError.code}`, t('errors.default'));

      Toast.error({ msg });
    } finally {
      loading.off();
    }
  }

  async function signUpWithGoogle() {
    try {
      const user = await Api.signInWithGoogle();

      const doesUserExist = await Api.doesDocumentExist('users', user.uid);
      if (doesUserExist) {
        navigate('/');

        return;
      }

      navigate('/auth/personal-details');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-10">
        Ready to Eatrite?
      </h2>
      <div className="flex flex-col gap-8">
        <UiButton
          onClick={signUpWithGoogle}
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
          onSubmit={signUpWithEmailAndPassword}
        >
          {({ errors }) => (
            <div className="grid gap-5">
              <UiInput
                placeholder="Enter email address"
                value={formData.value.email}
                name="email"
                error={errors.email}
                onChange={formData.set}
              />
              <UiInput
                placeholder="Enter your password"
                type="password"
                value={formData.value.password}
                name="password"
                error={errors.password}
                onChange={formData.set}
              />
              <div className="mt-5">
                <UiButton
                  loading={loading.value}
                  size="lg"
                  rounded="md"
                  variant="primary"
                  block
                >
                  Submit
                </UiButton>
              </div>
            </div>
          )}
        </UiForm>
      </div>
      <p className="text-base text-center mt-[22px] text-gray-1000 font-medium">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary font-bold">
          Log in
        </Link>
      </p>
      <p className="mt-24 text-xs text-center text-gray-700">
        By clicking “Sign in with Google” or “Continue with email” you agree to
        our{' '}
        <Link to="" className="text-gray-1000 font-bold">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link to="" className="text-gray-1000 font-bold">
          Privacy policy
        </Link>
      </p>
    </div>
  );
}

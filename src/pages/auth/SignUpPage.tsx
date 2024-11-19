import useObjectState from '@/hooks/useObjectState';
import { Link } from 'react-router-dom';
import SignUpSchema from '../../utils/schemas/SignUpSchema';
import UiButton from '@/components/ui/UiButton';
import UiForm from '@/components/ui/UiForm';
import UiIcon from '@/components/ui/UiIcon';
import UiInput from '@/components/ui/UiInput';
import UiOrSeperator from '@/components/ui/UiOrSeperator';
import { Api } from '@/Api';
import useToggle from '@/hooks/useToggle';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import TokenHandler from '@/utils/TokenHandler';

export default function SignUpForm() {
  const navigate = useNavigate();

  const formData = useObjectState({
    email: '',
    password: '',
  });

  const loading = useToggle();

  async function signUpWithEmailAndPassword() {
    try {
      loading.on();
      const user = await Api.createUserWithEmailAndPassword({
        email: formData.value.email,
        password: formData.value.password,
      });
      TokenHandler.setToken(user.uid);

      navigate('/auth/personal-details');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (
        firebaseError.message === 'Firebase: Error (auth/email-already-in-use).'
      ) {
        //TODO: IMPLEMENT TOAST
        console.log('email already in use ');
      }
    } finally {
      loading.off();
    }
  }

  async function signUpWithGoogle() {
    try {
      const user = await Api.signInWithGoogle();

      TokenHandler.setToken(user.uid);

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
          schema={SignUpSchema}
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

import useObjectState from '@/hooks/useObjectState';
import { Link } from 'react-router-dom';
import SignUpSchema from '../../utils/schemas/SignUpSchema';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';
import { Api } from '@/api';
import useToggle from '@/hooks/useToggle';
import { FirebaseError } from 'firebase/app';

interface Props {
  setStep: (step: number) => void
}

export default function SignUpForm({setStep}: Props) {
  const formData = useObjectState({
    email: '',
    password: '',
  });
  
  const loading = useToggle();

  async function signInWithEmailAndPassword() {
    try {
      loading.on();
      const user = await Api.createUserWithEmailAndPassword({
        email: formData.value.email,
        password: formData.value.password,
      });

      console.log(user);
      setStep(1);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.message === 'Firebase: Error (auth/email-already-in-use).') {
        console.log('email already in use ');
      }
    } finally {
      loading.off()
    }
  }

  async function signInWithGoogle() {

  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl sm:text-[32px] leading-10 sm:text-center mb-10">
        Ready to Eatrite?
      </h2>
      <div className="flex flex-col gap-8">
        <UiButton rounded="md" size="lg" variant="tertiary-outlined" block>
          <UiIcon size="20" icon="Google" />
          <p className="text-sm">Sign in with Google</p>
        </UiButton>
        <div className="or-border relative text-white">
          <p className="text-gray-600 w-fit py-0 mx-auto absolute bg-white px-2 top-[-12px] right-0 left-0">
            or
          </p>
        </div>
        <UiForm
          formData={formData.value}
          schema={SignUpSchema}
          onSubmit={signInWithEmailAndPassword}
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
                <UiButton loading={loading.value} size="lg" rounded="md" variant="primary" block>
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

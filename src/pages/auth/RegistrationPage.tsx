import { useState } from 'react';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import UiButton from '../../components/ui/UiButton';
import UiIcon from '../../components/ui/UiIcon';
import { Link } from 'react-router-dom';


export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    email: '',
  });

  function registerUser() {

  }

  function onChange() {
    
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold text-[32px] leading-10 text-center mb-10">
        Ready to Eatrite?
      </h1>
      <UiButton injectedClasses="mb-5" variant="transparent" block>
        <UiIcon size="20" icon="Google" />
        <p className="text-sm">Sign in with Google</p>
      </UiButton>
      <UiForm formData={formData} onSubmit={registerUser}>
        {({ errors }) => (
          <div className="grid gap-4">
            <UiInput
              placeholder="Enter your email"
              label="Email"
              value={formData.email}
              name="email"
              error={errors.email}
              onChange={onChange}
            />
            <UiButton block>Submit</UiButton>
            <p className="text-sm text-center">
              Already have an account?
              <Link to="/auth/login" className="text-primary underline">
                Log in
              </Link>
            </p>
          </div>
        )}
      </UiForm>
    </div>
  );
}

import { useState, lazy } from 'react';

const SignUpForm = lazy(() => import('../../components/auth/SignUpForm'));
const PersonDetailsForm = lazy(
  () => import('../../components/auth/PersonalDetailsForm'),
);

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    email: '',
  });

  function registerUser() {}

  function onChange() {}

  return (
    <div className="w-full">
      <SignUpForm />
      {/* <PersonDetailsForm/> */}
    </div>
  );
}

import { useState, lazy } from 'react';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import UiButton from '../../components/ui/UiButton';
import UiIcon from '../../components/ui/UiIcon';
import { Link } from 'react-router-dom';

const SignUpForm = lazy(() => import('../../components/auth/SignUpForm'));
const PersonDetailsForm = lazy(() => import('../../components/auth/PersonalDetailsForm'));

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    email: '',
  });

  function registerUser() {}

  function onChange() {}

  return (
    <div className="w-full">
      {/* <SignUpForm/> */}
      <PersonDetailsForm/>
    </div>
  );
}

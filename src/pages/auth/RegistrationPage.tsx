import {useState, lazy } from 'react';
import useObjectState from '@/hooks/useObjectState';
import RegistrationDetails from '@/types/RegistrationDetails';


const SignUpForm = lazy(() => import('../../components/auth/SignUpForm'));
const PersonDetailsForm = lazy(
  () => import('../../components/auth/PersonalDetailsForm'),
);

export default function RegistrationPage() {
  const [step, setStep] = useState<number>(0);

  function handleSetStep(step:number){
    setStep(step);
  }

  return (
    <div className="w-full">
      {step === 0 ? <SignUpForm setStep={handleSetStep}/> : <PersonDetailsForm />}
    </div>
  );
}

import { useState } from 'react';

export function useSteps<T = string>(initialStep: T) {
  const [step, setStep] = useState(initialStep);

  function nextStep(nextStep: T) {
    setStep(nextStep);
  }

  function isStep(currentStep: T) {
    return currentStep === step;
  }

  function resetStep() {
    setStep(initialStep);
  }

  return {
    step,
    nextStep,
    isStep,
    resetStep,
  };
}

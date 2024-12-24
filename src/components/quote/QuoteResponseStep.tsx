import { useMemo } from 'react';

type Step = {
  title: string;
  description: string;
};

interface Props {
  step: Step;
  stepNumber: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function QuoteResponceStep({
  step,
  stepNumber,
  currentStep,
  onStepChange,
}: Props) {
  const activeStepStyle = {
    title: 'font-bold ',
    step: 'font-bold bg-primary-500 text-white',
  };

  const inActiveStepStyle = {
    title: 'text-tertiary-900 font-medium',
    step: 'border border-tertiary-350 text-tertiary-350',
  };

  const completedStepStyle = {
    title: 'font-bold',
    step: 'font-bold bg-success-100 text-success-500',
  };

  function isActive() {
    return currentStep === stepNumber;
  }

  function isCompeted() {
    return currentStep > stepNumber;
  }

  const stepStyle = useMemo(() => {
    if (isCompeted()) {
      return completedStepStyle;
    } else if (isActive()) {
      return activeStepStyle;
    }

    return inActiveStepStyle;
  }, [currentStep]);

  return (
    <div
      onClick={() => onStepChange(stepNumber - 1)}
      className="flex gap-4 w-full cursor-pointer"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${stepStyle.step}`}
      >
        {stepNumber}
      </div>
      <div>
        <h3 className={`text-base  mb-1 ${stepStyle.title}`}>{step.title}</h3>
        <p className="text-xs text-tertiary-700">{step.description}</p>
      </div>
    </div>
  );
}

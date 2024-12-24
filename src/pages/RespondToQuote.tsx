import { useState, lazy } from 'react';
import { Link } from 'react-router-dom';

import { quotes } from '@/api/mock/quoteDetails';

import QuoteResponseStep from '@/components/quote/QuoteResponseStep';
import QuoteResponseConfirmation from '@/components/quote/QuoteResponseConfirmation';
import TheTopNav from '@/components/layout/TheTopNav';
import UiBorderedBox from '@/components/ui/UiBorderedBox';
import UiButton from '@/components/ui/UiButton';
import useToggle from '@/hooks/useToggle';

const RequestInformation = lazy(
  () => import('@/components/quote/RequestInformation'),
);
const TermsAndAttachment = lazy(
  () => import('@/components/quote/TermsAndAttachment'),
);
const Review = lazy(() => import('@/components/quote/Review'));

export default function RespondToQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  const [activeStep, setActiveStep] = useState(0);

  const isQuoteResConfirmVisible = useToggle();
  const isQuoteSending = useToggle()

  const quoteResponceSteps = [
    {
      title: 'Request Information',
      description: 'Provide details about the RFQ',
      component: <RequestInformation quote={quote} />,
    },
    {
      title: 'Terms and Attachments',
      description: 'Payment and delivery terms',
      component: (
        <TermsAndAttachment termsAndAttachments={quote.termsAndAttachments} />
      ),
    },
    {
      title: 'Review',
      description: 'Payment and delivery terms',
      component: <Review quote={quote} />,
    },
  ];

  function goToNextStep() {
    if (activeStep < quoteResponceSteps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === quoteResponceSteps.length - 1) {
      isQuoteResConfirmVisible.on();
    }
  }

  function handleStep(step: number) {
    setActiveStep(step);
  }

  function onSubmit() {
    isQuoteSending.on()

    setTimeout(()=>{
      isQuoteSending.off()
      isQuoteResConfirmVisible.off()
    }, 4000)
  }

  return (
    <section>
      <TheTopNav />
      <div className="p-8 mb-8">
        <div className="flex items-center gap-2 text-base font-ceraRegular stroke-gray-600 mb-6">
          <Link
            to="/procurement/quotes"
            className="text-primary-500 text-sm font-medium"
          >
            Quotes
          </Link>
          <span className="text-tertiary-350 font-medium">/</span>
          <span className="text-gray-1000 font-medium text-sm text-tertiary-400">
            Quote Response
          </span>
        </div>
        <div className="border border-tertiary-300 rounded-[10px] px-5 py-6 flex gap-6 mb-8">
          {quoteResponceSteps.map((step, index) => (
            <QuoteResponseStep
              step={step}
              stepNumber={index + 1}
              currentStep={activeStep + 1}
              onStepChange={handleStep}
            />
          ))}
        </div>
        <UiBorderedBox>
          {quoteResponceSteps[activeStep].component}

          <div className="mt-10 w-full flex gap-6 justify-end">
            <UiButton size="lg" variant="tertiary">
              Cancel
            </UiButton>
            <div className="w-[188px]">
              <UiButton variant="secondary" size="lg" block>
                Save as draft
              </UiButton>
            </div>
            <div className="w-[188px]">
              {' '}
              <UiButton onClick={goToNextStep} size="lg" block>
                Continue
              </UiButton>
            </div>
          </div>
        </UiBorderedBox>
      </div>
      <QuoteResponseConfirmation
        client={quote.client.name}
        rfqNumber={quote.rfqNumber}
        isOpen={isQuoteResConfirmVisible.value}
        onClose={() => isQuoteResConfirmVisible.off()}
        isLoading={isQuoteSending.value}
        sendQuoteResponse={onSubmit}
      />
    </section>
  );
}

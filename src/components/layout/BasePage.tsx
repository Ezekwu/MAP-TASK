import { ReactNode } from 'react';
import TheTopNav from './TheTopNav';
import UiLoader from '../ui/UiLoader';

interface Props {
  children: ReactNode;
  loading?: boolean;
  navDetails: {
    title: string;
    subtitle?: string;
    edgeNode?: ReactNode;
  };
}
export default function BasePage({ children, loading, navDetails }: Props) {
  return (
    <>
      <TheTopNav pageTitle={navDetails?.title} subtitle={navDetails.subtitle}>
        {navDetails.edgeNode}
      </TheTopNav>
      {loading ? (
        <UiLoader />
      ) : (
        <div className="p-8 pt-4 grid gap-8">{children}</div>
      )}
    </>
  );
}

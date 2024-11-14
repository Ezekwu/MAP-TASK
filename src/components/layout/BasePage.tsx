import { ReactNode } from 'react';
import TheTopNav from './TheTopNav';

interface Props {
  children: ReactNode;
  navDetails: {
    title: string;
    subtitle?: string;
    edgeNode?: ReactNode;
  };
}
export default function BasePage({ children, navDetails }: Props) {
  return (
    <>
      <TheTopNav pageTitle={navDetails?.title} subtitle={navDetails.subtitle}>
        {navDetails.edgeNode}
      </TheTopNav>
      <div className="p-8 pt-4 grid gap-8">{children}</div>
    </>
  );
}

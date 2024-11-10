import { ReactNode } from 'react';
import TheTopNav from './TheTopNav';

interface Props {
  children: ReactNode;
  metadata: {
    title: string;
    subtitle?: string;
  };
}
export default function BasePage({ children, metadata }: Props) {
  return (
    <>
      <TheTopNav pageTitle={metadata?.title} subtitle={metadata.subtitle} />
      <div className="p-8 pt-4 grid gap-8">{children}</div>
    </>
  );
}

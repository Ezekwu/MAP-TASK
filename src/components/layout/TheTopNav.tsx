interface Props {
  children?: React.ReactNode;
  pageTitle: string;
  subtitle?: string;
}

export default function TheTopNav({ pageTitle, subtitle, children }: Props) {
  return (
    <nav className="p-5 flex w-full justify-between">
      <div>
        <div className="font-semibold">{pageTitle}</div>
        <p className="text-gray-700 text-sm">{subtitle}</p>
      </div>
      <div style={{ minWidth: '300px' }}>{children}</div>
    </nav>
  );
}

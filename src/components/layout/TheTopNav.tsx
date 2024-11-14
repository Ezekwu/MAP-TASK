interface Props {
  children?: React.ReactNode;
  pageTitle: string;
  subtitle?: string;
}

export default function TheTopNav({ pageTitle, subtitle, children }: Props) {
  return (
    <nav className="p-8 flex w-full justify-between items-center sticky">
      <div className="grid gap-1">
        <div className="font-semibold text-xl leading-7">{pageTitle}</div>
        <p className="text-typography-subtitle text-sm leading-5">{subtitle}</p>
      </div>
      <div>{children}</div>
    </nav>
  );
}

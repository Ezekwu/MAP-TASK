interface Props {
  children?: React.ReactNode;
  pageTitle: string;
  subtitle?: string;
}

export default function TheTopNav({ pageTitle, subtitle, children }: Props) {
  return (
    <nav className="p-8 flex w-full justify-between sticky">
      <div className="grid gap-1">
        <h2 className="font-semibold text-xl leading-7">{pageTitle}</h2>
        <p className="text-typography-subtitle text-sm leading-5">{subtitle}</p>
      </div>
      <div>{children}</div>
    </nav>
  );
}

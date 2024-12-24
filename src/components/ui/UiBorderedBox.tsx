interface Props {
  children: React.ReactNode;
  boxShadow?: boolean
}

export default function UiBorderedBox({ children, boxShadow }: Props) {
  return (
    <section
      style={{
        boxShadow: boxShadow ? '0px 2px 4px -2px #0000000A' : '',
      }}
      className="border border-tertiary-300 rounded-lg p-6"
    >
      {children}
    </section>
  );
}

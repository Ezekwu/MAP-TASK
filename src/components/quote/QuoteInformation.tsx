export type Title = {
  label: string;
  query: string;
};

interface Props {
  data: Record<string, React.ReactNode>;
  titles: Title[];
}

export default function QuoteInformation({ data, titles }: Props) {
  return (
    <div className=" flex flex-col gap-4">
      {titles.map((title) => (
        <div className="grid grid-cols-2">
          <h3 className="font-medium text-base text-tertiary-400">
            {title.label}
          </h3>
          <div className="text-tertiary-700 font-medium">
            {data[title.query]}
          </div>
        </div>
      ))}
    </div>
  );
}

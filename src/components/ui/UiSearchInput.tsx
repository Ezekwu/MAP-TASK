import { useEffect, useState } from 'react';
import UiInput from './UiInput';
import UiIcon from './UiIcon';

interface Props {
  placeholder: string;
  onSearch: (value: string | null) => void;
}
export default function UiSearchInput({ placeholder, onSearch }: Props) {
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <UiInput
      name="search"
      prefixNode={<UiIcon icon="Search" />}
      placeholder={placeholder}
      value={query}
      onChange={({ value }) => setQuery(value)}
    />
  );
}

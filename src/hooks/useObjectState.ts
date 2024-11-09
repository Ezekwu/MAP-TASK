import { useState } from 'react';
import OnChangeParams from '../types/OnChangeParams';

export default function useObjectState<T = Record<string, string>>(
  data = {} as T,
) {
  const [value, setValue] = useState(data);

  function set(params: OnChangeParams) {
    setValue((val) => ({
      ...val,
      [params.name]: params.value,
    }));
  }

  return {
    value,
    set,
  };
}
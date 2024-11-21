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
  function setDeep(params: OnChangeParams) {
    setValue((val) => {
      const updatedValue = { ...val };
      const keys = params.name.split('.');
      let current: any = updatedValue;

      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = params.value;

      return updatedValue;
    });
  }

  return {
    value,
    set,
    setDeep,
  };
}

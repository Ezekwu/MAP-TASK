import { useState } from 'react';

export default function useBooleanState(data: boolean) {
  const [value, setValue] = useState(data);

  function on() {
    setValue(true);
  }

  function off() {
    setValue(false);
  }

  function toggle() {
    setValue(!value);
  }

  return {
    value,
    on,
    off,
    toggle,
  };
}

import { generateUuid } from '@/utils/helpers';
import { useState } from 'react';

export default function useKey() {
  const [key, setKey] = useState(generateUuid());

  function newKey() {
    setKey(generateUuid());
  }

  return {
    key,
    newKey,
  };
}

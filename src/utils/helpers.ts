import { v4 as uuidv4 } from 'uuid';

export function generateUuid() {
  return uuidv4();
}

export function isFile(variable: unknown): variable is File {
  return variable instanceof File;
}

export function formatTimestampToDateTime(timestamp: number): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export function formatNutrients(nutrients:{
    fibre?: number;
    fat?: number;
    kcal?: number;
    protein?: number;
  }) {
    return Object.entries(nutrients).map(
      ([key, value]) => `${value}${key === 'kcal' ? '' : 'g'} ${key}`,
    );
}

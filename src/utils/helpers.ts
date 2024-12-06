import { v4 as uuidv4 } from 'uuid';

export function generateUuid() {
  return uuidv4();
}

export function isFile(variable: unknown): variable is File {
  return variable instanceof File;
}

export function castToType<T>(val: unknown) {
  return val as T;
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

export function removeUndefined(obj: any): any {
  if (Array.isArray(obj)) {
    // Recursively clean each item in the array
    return obj.map(removeUndefined).filter((item) => item !== undefined);
  } else if (obj && typeof obj === 'object') {
    // Recursively clean each key in the object
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const cleanedValue = removeUndefined(value);
        if (cleanedValue !== undefined) {
          acc[key] = cleanedValue;
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  // Return the value if it's not an object or array (primitive value)
  return obj;
}

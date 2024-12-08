import User from '@/types/User';
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
    return obj.map(removeUndefined).filter((item) => item !== undefined);
  } else if (obj && typeof obj === 'object') {
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

  return obj;
}

export function getUserFullName(user?: User) {
  if (!user) return 'Eatrite user';

  return `${user.first_name || 'Eatrite'} ${user?.last_name || 'User'}`;
}

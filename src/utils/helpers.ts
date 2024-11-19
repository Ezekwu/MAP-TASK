import { v4 as uuidv4 } from 'uuid';

export function generateUuid() {
  return uuidv4();
}

export function isFile(variable: unknown): variable is File {
  return variable instanceof File;
}
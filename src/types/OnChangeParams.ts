import { Dayjs } from 'dayjs';

export default interface OnChangeParams {
  name: string;
  value: string | undefined | null | File | Dayjs;
}

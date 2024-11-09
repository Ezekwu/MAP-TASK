import { Dayjs } from 'dayjs';

export default interface OnChangeParams {
  name: string;
  value: string | undefined | File | null | Dayjs;
}

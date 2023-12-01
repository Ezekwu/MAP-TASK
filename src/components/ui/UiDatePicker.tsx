import { useMemo, useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import OutsideClickHandler from 'react-outside-click-handler';
import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';
import dayjs, { Dayjs } from 'dayjs';
import CalendarWidget from '../calendar/CalendarWidget';

interface Props {
  label?: string;
  value: Dayjs;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  onChange: (event: OnChangeParams) => void;
}
export default function UiDatePicker({
  value = dayjs(),
  label,
  placeholder = 'Pick a date from the calendar',
  name,
  error,
  onChange,
}: Props) {
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const valueLabel = useMemo(() => {
    if (!value) return placeholder;

    return value.format('YYYY-MM-DD');
  }, [value]);

  function selectDate(value: Dayjs) {
    onChange({ name, value });
    setCalendarIsVisible(false);
  }
  return (
    <OutsideClickHandler onOutsideClick={() => setCalendarIsVisible(false)}>
      <UiField error={error} label={label}>
        <button
          type="button"
          data-testid="ui-select-trigger"
          className={`outline-none rounded-md w-full border text-left text-xs py-2  flex items-center h-12 justify-between px-4 ${
            !!error
              ? 'bg-danger-100 placeholder:text-danger border-danger'
              : `bg-white border-gray-50`
          }`}
          onClick={() => setCalendarIsVisible(!calendarIsVisible)}
        >
          <div className="w-full">
            {!!valueLabel ? valueLabel : placeholder}
          </div>
          {calendarIsVisible ? <CaretUp /> : <CaretDown />}
        </button>
        {calendarIsVisible && (
          <div
            data-testid="ui-date-picker-calendar"
            className="absolute bg-white rounded-md mt-2 border-gray-50 border z-20 p-2 w-full"
          >
            <CalendarWidget value={value} size="sm" selectDate={selectDate} />
          </div>
        )}
      </UiField>
    </OutsideClickHandler>
  );
}

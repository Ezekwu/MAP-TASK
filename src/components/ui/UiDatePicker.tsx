import OutsideClickHandler from "react-outside-click-handler";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import useToggle from "@/hooks/useToggle";
// import styles from './datepicker.module.scss'
// import './datepicker.css'
import UiField from "./UiField";
import OnChangeParams from "@/types/OnChangeParams";
import UiIcon from "./UiIcon";

interface Props {
  name: string;
  label: string;
  onChange: (event: OnChangeParams) => void;
  value: Date;
  disabled?: boolean;
}

export default function UidatePicker({ name, label, onChange, value, disabled }: Props) {
  const isCalendarVisible = useToggle();

  function hideCalendar() {
    return isCalendarVisible.off();
  }

  function toggleCalendar() {
    return isCalendarVisible.toggle();
  }

  function handleChange() {
    onChange({name, value})
  }

  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        hideCalendar();
      }}
    >
      <UiField label={label}>
        <div
          onClick={() => {
            !disabled && toggleCalendar();
          }}
          className={`border border-[#D0D5DD] h-10 flex items-center gap-2 px-3 rounded-md ${disabled ? 'bg-[#F0F2F5] text-tertiary-350' : 'bg-transparent text-tertiary-900 '}`}
        >
          <UiIcon icon="Calendar"/>
          <p>{value?.toDateString() || 'Select Date'}</p>
        </div>
        <div>
          {isCalendarVisible.value && (
            <Calendar value={value} onChange={handleChange} />
          )}
        </div>
      </UiField>
      {/* <div
        className={`${styles.date_picker_wrapper}  ${error && styles.error}`}
      >
        <label>{label}</label>
        <Controller
          name={name}
          control={control}
          defaultValue={date}
          render={({ field }) => (
            <div  className={styles.input_calendar_wrapper}>
              <div
                onClick={toggleCalendar}
                className={`${styles.date_picker} ${isCalendarVisible.value && styles.picker_visible}`}
              >
                <p>{field.value?.toDateString() || 'Select Date'}</p>
                <CalendarThinSvg />
              </div>
              <div className={styles.calendar_wrapper}>
                {isCalendarVisible.value && (
                  <Calendar  onChange={field.onChange} value={field.value} />
                )}
              </div>
            </div>
          )}
        />
        {<span className={styles.error__span}>{error && `${error}`}</span>}
      </div> */}
    </OutsideClickHandler>
  );
}

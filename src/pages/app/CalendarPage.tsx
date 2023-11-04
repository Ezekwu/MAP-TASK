import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import CalendarWidget from '../../components/calendar/CalendarWidget';
import TheTopNav from '../../components/layout/TheTopNav';
import AddSchedule from '../../components/schedule/AddSchedule';
import UiButton from '../../components/ui/UiButton';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [addScheduleIsVisible, setAddScheduleIsVisible] = useState(false);

  function openAddSchedule() {
    setAddScheduleIsVisible(true);
  }
  function selectDate(day: Dayjs) {
    setSelectedDate(day);
    openAddSchedule();
  }
  return (
    <div>
      <TheTopNav
        pageTitle="Calendar"
        subtitle="View your schedule, view your booking, book meetings"
      >
        <div className="flex justify-end">
          <UiButton onClick={openAddSchedule}>Add Schedule</UiButton>
        </div>
      </TheTopNav>
      <div className="m-5 bg-white rounded-md pb-4">
        <CalendarWidget value={selectedDate} selectDate={selectDate} />
      </div>
      <AddSchedule
        isOpen={addScheduleIsVisible}
        selectedDate={selectedDate}
        onClose={() => setAddScheduleIsVisible(false)}
      />
    </div>
  );
}

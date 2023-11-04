import dayjs from 'dayjs';
import { useState } from 'react';
import CalendarWidget from '../../components/calendar/CalendarWidget';
import TheTopNav from '../../components/layout/TheTopNav';
import UiButton from '../../components/ui/UiButton';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  return (
    <div>
      <TheTopNav
        pageTitle="Calendar"
        subtitle="View your schedule, view your booking, book meetings"
      >
        <div className="flex justify-end">
          <UiButton>Add Schedule</UiButton>
        </div>
      </TheTopNav>
      <div className="p-5">
        <CalendarWidget value={selectedDate} />
      </div>
    </div>
  );
}
